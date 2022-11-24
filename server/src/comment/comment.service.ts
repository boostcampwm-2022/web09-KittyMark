import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { GetCommentsDto } from './dto/get-comments.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getComments(getCommentsDto: GetCommentsDto) {
    const { boardId, count, max_id } = getCommentsDto;
    return await this.commentRepository.findCommentListBy(
      boardId,
      count,
      max_id,
    );
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const { userId, content, boardId, rootCommentId } = createCommentDto;
    const commentInfo = {
      content: content,
      user: userId,
      board: boardId,
      rootComment: rootCommentId,
    };
    const comment = plainToInstance(Comment, commentInfo);
    await this.commentRepository.save(comment);

    return {
      statusCode: 201,
      message: 'Success',
      data: { commentId: comment.id },
    };
  }
}
