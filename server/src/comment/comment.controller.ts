import { Query } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetCommentsDto } from './dto/get-comments.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('')
  getComments(@Query(new ValidationPipe()) getCommentsDto: GetCommentsDto) {
    console.log(getCommentsDto);
    return this.commentService.getComments(getCommentsDto);
  }

  @Post('')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  // @Delete('')
  // deleteComment() {}

  // @Patch('')
  // updateComment() {}
}
