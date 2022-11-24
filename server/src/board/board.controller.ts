import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoardDto';
import { UpdateBoardDto } from './dto/updateBoaedDto';
import { ResponseInterceptor } from '../interceptor/responseInterceptor';
import { DeleteBoardDto } from 'board/dto/deleteBoardDto';

@Controller('board')
@UseInterceptors(ResponseInterceptor)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto);
  }

  @Patch('/')
  @UsePipes(ValidationPipe)
  updateBoard(@Body() updateBoardDto: UpdateBoardDto) {
    this.boardService.updateBoard(updateBoardDto);
    return;
  }

  @Delete('/')
  deleteBoard(@Body() deleteBoardDto: DeleteBoardDto) {
    this.boardService.deleteBoard(deleteBoardDto);
    return;
  }

  @Get('/')
  getBoardList(
    @Query('count', ParseIntPipe) count: number,
    @Query('max_id', ParseIntPipe) maxId: number,
  ) {
    return this.boardService.getLastBoardList(count, maxId);
  }

  // @Get('/:boardId/comment')
  // searchComment(
  //   @Param('boardId', ParseIntPipe) boardId: number,
  //   @Query('count', ParseIntPipe) count: number,
  // ) {}
  //
  // @Get('/:boardId/like')
  // searchLikePeople() {}
  //
  // @Post('/like')
  // boardLike() {}
  //
  // @Delete('/like')
  // boardLikeDelete() {}
}
