import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ResponseInterceptor } from '../interceptor/responseInterceptor';
import { DeleteBoardDto } from './dto/delete-board.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetUserBoardsDto } from './dto/get-user-boards.dto';
import { LikeBoardDto } from 'board/dto/like-board.dto';
import { LikeService } from '../like/like.service';

@Controller('board')
@UseInterceptors(ResponseInterceptor)
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly likeService: LikeService,
  ) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('images'))
  @UsePipes(ValidationPipe)
  createBoard(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return this.boardService.createBoard(createBoardDto, images);
  }

  @Patch('/')
  @UsePipes(ValidationPipe)
  updateBoard(@Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.updateBoard(updateBoardDto);
  }

  @Delete('/')
  @UsePipes(ValidationPipe)
  deleteBoard(@Body() deleteBoardDto: DeleteBoardDto) {
    return this.boardService.deleteBoard(deleteBoardDto);
  }

  @Get('/')
  getBoardList(
    @Query('count', ParseIntPipe) count: number,
    @Query('max_id', ParseIntPipe) maxId: number,
  ) {
    return this.boardService.getLastBoardList(count, maxId);
  }

  @Get('/user')
  getUserBoardList(@Query(ValidationPipe) getUserBoardsDto: GetUserBoardsDto) {
    return this.boardService.getUserBoards(getUserBoardsDto);
  }

  @Get('/like')
  searchLikePeople(@Query('boardId', ParseIntPipe) boardId: number) {
    return this.likeService.getBoardLikeList(boardId);
  }

  @Post('/like')
  @UsePipes(ValidationPipe)
  boardLike(@Body() likeBoardDto: LikeBoardDto) {
    return this.likeService.boardLike(likeBoardDto);
  }

  @Delete('/like')
  @UsePipes(ValidationPipe)
  boardLikeDelete(@Body() likeBoardDto: LikeBoardDto) {
    return this.likeService.boardUnLike(likeBoardDto);
  }
}
