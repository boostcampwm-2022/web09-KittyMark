import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckNameDto } from './dto/check-name.dto';
import { GetProfileInfoDto } from './dto/get-profile-info.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
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
    const user = await this.userRepository.findById(userId);

    if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');

    return {
      statusCode: 200,
      message: 'Success',
      data: {
        userId: user.id,
        userName: user.name,
        userProfileUrl: user.profileUrl,
        follow: { count: 0 },
        followed_by: { count: 0 },
        followed_by_viewer: false,
        follows_viewer: false,
      },
    };
  }
}
