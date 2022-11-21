import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './user-register.dto';
import { User } from './user.entity';
import { OauthInfo } from './user.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByOauthInfo(
    email: string,
    oauth_info: OauthInfo,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email: email, oauth_info: oauth_info },
    });
  }

  async register(registerUserDto: RegisterUserDto) {
    // TODO: OauthInfo 추가
    const { email, imageURL, userName } = registerUserDto;

    const find = await this.findByOauthInfo(email, OauthInfo.NAVER);

    if (find) {
      throw new ConflictException('이미 존재하는 유저입니다.');
    }

    const user = {
      name: userName,
      email: email,
      oauth_info: OauthInfo.NAVER,
      profile_url: imageURL,
    };
    this.userRepository.save(user);

    return { code: 200, message: 'Success' };
  }
}
