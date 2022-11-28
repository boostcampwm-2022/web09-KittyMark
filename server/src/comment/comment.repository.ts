import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async save(comment: Comment) {
    await this.commentRepository.save(comment);
  }

  async findCommentListBy(boardId: number, count: number, maxId: number) {
    let results;

    const queryBuilder = this.commentRepository
      .createQueryBuilder('c')
      .select(['c', 'u.id', 'u.name', 'u.profileUrl'])
      .innerJoin('c.board', 'b')
      .innerJoin('c.user', 'u')
      .where('c.board_id = :id', { id: boardId })
      .orderBy('c.created_at', 'DESC');

    if (maxId == -1) {
      results = await queryBuilder.limit(count).getMany();
    } else {
      const lastComment = await this.commentRepository.findOneBy({ id: maxId });
      results = await queryBuilder
        .andWhere('c.created_at < :created_at', {
          created_at: lastComment.createdAt,
        })
        .getMany();
    }

    if (results.length !== 0) {
      const _count = results.length;
      const nextMaxId = results[_count - 1].id;
      return {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Success',
          comments: results,
          board_id: boardId,
          count: _count,
          next_max_id: nextMaxId,
        },
      };
    } else {
      return {
        statusCode: 200,
        message: 'Success',
        data: {
          comments: null,
          board_id: boardId,
          count: 0,
          next_max_id: -1,
        },
      };
    }
  }

  async findUserById(id: number): Promise<Comment> {
    return await this.commentRepository
      .createQueryBuilder('c')
      .select(['c', 'u.id'])
      .leftJoin('c.user', 'u')
      .where('c.id = :id', { id: id })
      .getOne();
  }

  async deleteById(id: number) {
    return await this.commentRepository.delete({ id: id });
  }
}
