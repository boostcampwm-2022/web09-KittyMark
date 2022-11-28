import { Param, Query } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get, Post, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetCommentsDto } from './dto/get-comments.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('')
  getComments(@Query(new ValidationPipe()) getCommentsDto: GetCommentsDto) {
    return this.commentService.getComments(getCommentsDto);
  }

  @Post('')
  createComment(
    @Body(new ValidationPipe()) createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(createCommentDto);
  }

  @Delete(':commentId')
  deleteComment(
    @Param('commentId') commentId: number,
    @Body(new ValidationPipe()) deleteCommentDto: DeleteCommentDto,
  ) {
    return this.commentService.deleteComment(commentId, deleteCommentDto);
  }

  // @Patch('')
  // updateComment() {}
}
