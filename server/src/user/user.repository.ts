import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { OauthInfo } from '../auth/model/oauth-info.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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

  async save(user: {
    name: string;
    email: string;
    oauth_info: OauthInfo;
    profile_url: string;
  }) {
    return await this.userRepository.save(user);
  }
}
