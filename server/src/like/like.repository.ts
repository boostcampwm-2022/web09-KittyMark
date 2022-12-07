import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeRepository {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
  ) {}

  async save(like: Like) {
    await this.likeRepository.save(like);
  }

  async deleteByUserBoardId(userId: number, boardId: number) {
    await this.likeRepository
      .createQueryBuilder('like')
      .delete()
      .where(`board_id = ${boardId}`)
      .andWhere(`user_id = ${userId}`)
      .execute();
  }

  async findDistinctLike(boardId: number, userId: number) {
    console.log(boardId);
    const data = await this.likeRepository
      .createQueryBuilder('like')
      .select('*')
      .where(`board_id = ${boardId}`)
      .andWhere(`user_id = ${userId}`)
      .execute();
    console.log(data);

    return data.length !== 0;
  }

  async findLikeCountByBoardId(boardId: number) {
    return {
      likeCount: await this.likeRepository
        .createQueryBuilder('like')
        .where(`board_id = ${boardId}`)
        .getCount(),
    };
  }
}
