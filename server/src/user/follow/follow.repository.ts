import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';

@Injectable()
export class FollowRepository {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
  ) {}

  async findAll(): Promise<Follow[]> {
    return await this.followRepository.find({
      relations: ['user', 'followedUser'],
    });
  }

  async findFollow(userId: number, followedUserId: number) {
    return await this.followRepository.findOne({
      where: { user: { id: userId }, followedUser: { id: followedUserId } },
      relations: ['user', 'followedUser'],
    });
  }

  async save(follow: Follow) {
    return await this.followRepository.save(follow);
  }

  async delete(idInfo) {
    await this.followRepository.delete(idInfo);
  }
}
