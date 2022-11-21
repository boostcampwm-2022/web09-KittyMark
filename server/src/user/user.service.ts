import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './user-register.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  register(registerUserDto: RegisterUserDto) {
    // TODO: OauthInfo 추가
    try {
      const { email, imageURL, userName } = registerUserDto;
      const user = {
        name: userName,
        email: email,
        oauth_info: 'NAVER',
        profile_url: imageURL,
      };
      this.userRepository.save(user);

      return { code: 200, message: 'Success' };
    } catch (error) {
      throw new ConflictException('이미 존재하는 유저입니다');
    }
  }
}
