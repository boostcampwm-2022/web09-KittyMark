import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { GetCommentsDto } from './dto/get-comments.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { plainToInstance } from 'class-transformer';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { BoardRepository } from 'board/board.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly boardRepository: BoardRepository,
  ) {}

  async getComments(getCommentsDto: GetCommentsDto) {
    const { board_id, count, max_id } = getCommentsDto;
    return await this.commentRepository.findCommentListBy(
      board_id,
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

  async deleteComment(commentId, deleteCommentDto: DeleteCommentDto) {
    if (!commentId)
      throw new BadRequestException(`'commentId'(path) should not be empty`);

    const { boardId, userId } = deleteCommentDto;

    const comment = await this.commentRepository.findUserById(commentId);

    const board = await this.boardRepository.findUserById(boardId);

    //comment가 달린 게시글 ID와 인풋으로 받은 boardID가 다를 경우를 처리해야함.

    if (!comment || !board) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }

    if (userId !== comment.user?.id && userId != board.user?.id) {
      throw new ForbiddenException(
        '댓글 작성자와 게시글 작성자 본인만 댓글을 삭제할 수 있습니다.',
      );
    }
    await this.commentRepository.deleteById(commentId);
    return { statusCode: 200, message: 'Success' };
  }

  async updateComment(commentId, updateCommentDto: UpdateCommentDto) {
    if (!commentId)
      throw new BadRequestException(`'commentId'(path) should not be empty`);

    const { userId, content } = updateCommentDto;

    const comment = await this.commentRepository.findUserById(commentId);

    if (!comment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }

    if (userId !== comment.user?.id) {
      throw new ForbiddenException(
        '댓글 작성자 본인만 댓글을 수정할 수 있습니다.',
      );
    }
    await this.commentRepository.updateById(commentId, { content });
    return { statusCode: 200, message: 'Success' };
  }
}
