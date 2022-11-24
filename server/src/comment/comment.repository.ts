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

    if (maxId == -1) {
      results = await this.commentRepository
        .createQueryBuilder('c')
        .select(['c', 'u.id', 'u.name', 'u.profileUrl'])
        .innerJoin('c.board', 'b')
        .innerJoin('c.user', 'u')
        .where('c.board_id = :id', { id: boardId })
        .getMany();
    } else {
      results = await this.commentRepository
        .createQueryBuilder('c')
        .select(['c', 'u.id', 'u.name', 'u.profileUrl'])
        .innerJoin('c.board', 'b')
        .innerJoin('c.user', 'u')
        .where('c.board_id = :id', { id: boardId })
        .andWhere('c.id > :id', { id: maxId })
        .getMany();
    }

    results = results.slice(0, count);
    const _count = results.length;
    const nestMaxId = results[_count - 1].id;

    console.log(results);

    return {
      statusCode: 200,
      message: 'Success',
      data: {
        comments: results,
        board_id: boardId,
        count: _count,
        next_max_id: nestMaxId,
      },
    };
  }
}
