import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { OauthInfo } from '../auth/model/oauth-info.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(userId: number): Promise<User | undefined> {
    return await this.userRepository.findOneBy({
      id: userId,
    });
  }

  async findByName(userName: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({
      name: userName,
    });
  }

  async findByOauthInfo(
    email: string,
    oauth_info: OauthInfo,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email: email, oauthInfo: oauth_info },
    });
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }

  async update(id: number, updatedData) {
    await this.userRepository.update(id, updatedData);
  }

  async findUserSummaryById(userId: number) {
    const result: {
      user_id: number;
      user_name: string;
      profile_url: string;
      boardCount: number;
    } = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.profile_url'])
      .addSelect('COUNT(board.id)', 'boardCount')
      .leftJoin('user.boards', 'board')
      .where('user.id = :id', { id: userId })
      .getRawOne();

    console.log(result);
    return result;
  }
}
