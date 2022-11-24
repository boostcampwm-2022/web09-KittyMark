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

  async findCommentListBy(boardId: number, count: number, maxId: number) {}
}
