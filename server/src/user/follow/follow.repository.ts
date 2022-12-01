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

  async findFollowing(userId: number) {
    return await this.followRepository.query(
      `SELECT user.id, user.name, user.profile_url FROM follow LEFT JOIN user ON user.id = follow.followed_user_id WHERE follow.user_id = ${userId};`,
    );
  }

  isExistQuery = (query: string) => `SELECT EXISTS(${query})`;

  async findFollower(userId: number) {
    return await this.followRepository
      .query(`SELECT FOLLOWS.*, ISNULL(followed_user_Id) AS is_followed_by_user\
       FROM (SELECT user.id, user.name, user.profile_url FROM follow LEFT JOIN user ON user.id=follow.user_id WHERE followed_user_id=${userId}) AS FOLLOWS\
       LEFT JOIN (SELECT followed_user_Id FROM follow WHERE follow.user_id=1) AS sub ON sub.followed_user_id = FOLLOWS.id;`);
  }

  async findFollowingCnt(userId: number) {
    return await this.followRepository.query(
      `SELECT COUNT(*) AS count FROM follow LEFT JOIN user ON user.id = follow.followed_user_id WHERE follow.user_id = ${userId};`,
    );
  }

  async findFollowerCnt(userId: number) {
    return await this.followRepository.query(
      `SELECT COUNT(*) AS count FROM follow LEFT JOIN user ON user.id = follow.user_id WHERE follow.followed_user_id = ${userId}; `,
    );
  }
}
