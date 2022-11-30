import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { S3Service } from 'src/S3/S3.service';
import { CheckNameDto } from './dto/check-name.dto';
import { GetProfileInfoDto } from './dto/get-profile-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
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

    return {
      statusCode: 200,
      message: 'Success',
      data: {
        userId: user.user_id,
        userName: user.user_name,
        userProfileUrl: user.profile_url,
        boards: { count: user.boardCount },
        follow: { count: 0 },
        followed_by: { count: 0 },
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
}
