import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { S3Service } from 'src/S3/S3.service';
import { FollowDto } from './dto/follow.dto';
import { CheckNameDto } from './dto/check-name.dto';
import { GetProfileInfoDto } from './dto/get-profile-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { Follow } from './follow/follow.entity';
import { FollowRepository } from './follow/follow.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
    private readonly followRepository: FollowRepository,
  ) {}
  async checkName(checkNameDto: CheckNameDto) {
    const { name } = checkNameDto;

    const user = await this.userRepository.findByName(name);
    if (user) {
      return { statusCode: 200, message: 'Success', data: { isExist: true } };
    } else {
      return { statusCode: 200, message: 'Success', data: { isExist: false } };
    }
  }

  async getUserInfo(getProfileInfoDto: GetProfileInfoDto) {
    const { userId } = getProfileInfoDto;
    const user = await this.userRepository.findUserSummaryById(userId);

    if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');

    const follow = await this.followRepository.findFollowingCnt(userId);
    const follower = await this.followRepository.findFollowerCnt(userId);

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
        followed_by_viewer: false,
        follows_viewer: false,
      },
    };
  }

  async updateUserInfo(
    updateUserInfoDto: UpdateUserInfoDto,
    image: Express.Multer.File,
  ) {
    const { userId, userName } = updateUserInfoDto;

    let profileUrl = null;
    if (image) {
      profileUrl = await this.s3Service.uploadFile(image);
    }

    if (userName) {
      const name = await this.userRepository.findByName(userName);
      if (name) throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    if (profileUrl && userName) {
      this.userRepository.update(userId, { profileUrl, name: userName });
    } else if (profileUrl) {
      this.userRepository.update(userId, { profileUrl });
    } else if (userName) {
      this.userRepository.update(userId, { name: userName });
    }

    return { statusCode: 200, message: 'Success' };
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

  async getFollowList(userId: number) {
    const users_followed_by_user = await this.followRepository.findFollowing(
      userId,
    );
    const users_follow_user = await this.followRepository.findFollower(userId);

    users_follow_user.map((record) => {
      record.is_followed_by_user =
        record.is_followed_by_user == '0' ? false : true;
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
