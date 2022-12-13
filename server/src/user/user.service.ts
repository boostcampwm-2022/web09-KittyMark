import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { S3Service } from '../S3/S3.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FollowDto } from './dto/follow.dto';
import { GetProfileInfoDto } from './dto/get-profile-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { ValidateNameDto } from './dto/validate-name.dto';
import { Follow } from './follow/follow.entity';
import { FollowRepository } from './follow/follow.repository';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
    private readonly followRepository: FollowRepository,
  ) {}

  async createUser(image: Express.Multer.File, createUserDto: CreateUserDto) {
    // TODO: OauthInfo 추가
    const { email, userName, oauthInfo } = createUserDto;

    await this.validateName({ name: userName });

    const find = await this.userRepository.findByOauthInfo(email, oauthInfo);
    if (find) {
      throw new ConflictException('이미 존재하는 유저입니다.');
    }

    let imageURL = '';

    if (image) {
      imageURL = await this.s3Service.uploadFile(image);
    }

    const userInfo = {
      name: userName,
      email: email,
      oauthInfo: oauthInfo,
      profileUrl: imageURL,
    };

    const user = plainToInstance(User, userInfo);
    this.userRepository.save(user);

    return { statusCode: 201, message: 'Success' };
  }

  async getUserInfo(getProfileInfoDto: GetProfileInfoDto) {
    const { userId, viewerId } = getProfileInfoDto;
    const user = await this.userRepository.findUserSummaryById(userId);

    console.log(user);
    if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');

    const follow = await this.followRepository.findFollowingCnt(userId);
    const follower = await this.followRepository.findFollowerCnt(userId);

    const followedByViewer = await this.followRepository.findFollow(
      viewerId,
      userId,
    );
    const followsViewer = await this.followRepository.findFollow(
      userId,
      viewerId,
    );

    return {
      statusCode: 200,
      message: 'Success',
      data: {
        userId: user.user_id,
        userName: user.user_name,
        userProfileUrl: user.profile_url,
        boards: { count: user.boardCount },
        follow: { count: follow[0].count },
        followed_by: { count: follower[0].count },
        followed_by_viewer: followedByViewer ? true : false,
        follows_viewer: followsViewer ? true : false,
      },
    };
  }

  async updateUserInfo(
    updateUserInfoDto: UpdateUserInfoDto,
    image: Express.Multer.File,
    session_userId: number,
  ) {
    const { userId, userName } = updateUserInfoDto;

    if (session_userId !== userId)
      throw new ForbiddenException('본인 정보만 수정할 수 있습니다.');

    let profileUrl = null;
    if (image) {
      profileUrl = await this.s3Service.uploadFile(image);
    }

    if (userName) {
      await this.validateName({ name: userName });
    }

    let data: null | { profileUrl: string };

    if (profileUrl && userName) {
      this.userRepository.update(userId, { profileUrl, name: userName });
      data = { profileUrl };
    } else if (profileUrl) {
      this.userRepository.update(userId, { profileUrl });
      data = { profileUrl };
    } else if (userName) {
      this.userRepository.update(userId, { name: userName });
    }

    return { statusCode: 200, message: 'Success', data };
  }

  async validateName(validateNameDto: ValidateNameDto) {
    const { name } = validateNameDto;

    if (/[^\w.]/.test(name))
      throw new BadRequestException(
        '사용자 이름에는 문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
      );

    const user = await this.userRepository.findByName(name);
    if (user) {
      return { statusCode: 200, message: 'Success', data: { isExist: true } };
    } else {
      return { statusCode: 200, message: 'Success', data: { isExist: false } };
    }
  }

  async addFollow(followDto: FollowDto) {
    const { userId, followedUserId } = followDto;

    if (userId === followedUserId)
      throw new BadRequestException('스스로를 팔로우할 수 없습니다.');

    const user = await this.userRepository.findById(userId);
    const followedUser = await this.userRepository.findById(followedUserId);

    if (!user || !followedUser)
      throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const f = await this.followRepository.findFollow(userId, followedUserId);
    if (f) {
      throw new ConflictException('이미 팔로우가 되어 있습니다.');
    }
    const follow = plainToInstance(Follow, {
      user: userId,
      followedUser: followedUserId,
    });

    await this.followRepository.save(follow);
    return {
      statusCode: 200,
      message: 'Success',
      data: { followId: follow.id },
    };
  }

  async deleteFollow(followDto: FollowDto) {
    const { userId, followedUserId } = followDto;

    if (userId === followedUserId)
      throw new BadRequestException('스스로를 팔로우 취소할 수 없습니다.');

    const user = await this.userRepository.findById(userId);
    const followedUser = await this.userRepository.findById(followedUserId);

    if (!user || !followedUser)
      throw new NotFoundException('사용자를 찾을 수 없습니다.');

    await this.followRepository.delete({
      user: userId,
      followedUser: followedUserId,
    });

    return { statusCode: 200, message: 'Success' };
  }

  async getFollowList(userId: number, viewerId: number) {
    const users_followed_by_user = await this.followRepository.findFollowing(
      userId,
      viewerId,
    );
    const users_follow_user = await this.followRepository.findFollower(
      userId,
      viewerId,
    );

    users_followed_by_user.map((record) => {
      record.is_followed_by_viewer = record.is_followed_by_viewer === '0';
      return record;
    });

    users_follow_user.map((record) => {
      record.is_followed_by_viewer = record.is_followed_by_viewer === '0';
      return record;
    });

    return {
      statusCode: 200,
      message: 'Success',
      data: {
        userId: userId,
        users_followed_by_user,
        users_follow_user,
      },
    };
    // return this.userRepository.findFollowsById(userId);
  }
}
