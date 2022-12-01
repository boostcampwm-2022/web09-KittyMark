import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { UserRepository } from '../user/user.repository';
import { Photo } from './photo.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { DeleteBoardDto } from './dto/delete-board.dto';
import { plainToInstance } from 'class-transformer';
import { BoardRepository } from 'board/board.repository';
import { PhotoRepository } from 'board/photo.repository';
import { S3Service } from 'src/S3/S3.service';
import { GetUserBoardsDto } from './dto/get-user-boards.dto';
import { toPoint } from 'board/board.util';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly photoRepository: PhotoRepository,
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
  ) {}

  async createBoard(
    createBoardDto: CreateBoardDto,
    images: Express.Multer.File[],
  ) {
    if (images.length === 0) {
      throw new BadRequestException('images should not be empty');
    }

    const { content, isStreet, location, longitude, latitude, userId } =
      createBoardDto;
    const user = await this.userRepository.findById(userId);
    const coordinate = toPoint(latitude, longitude);
    const boardInfo = {
      content,
      isStreet,
      location,
      coordinate,
      user,
    };

    const board = plainToInstance(Board, boardInfo);
    await this.boardRepository.save(board);

    const urls = await this.s3Service.uploadFiles(images);

    urls.forEach((url) => {
      const imageInfo = {
        url,
        board,
      };
      const photo = plainToInstance(Photo, imageInfo);
      this.photoRepository.save(photo);
    });

    return { boardId: board.id };
  }

  async updateBoard(updateBoardDto: UpdateBoardDto) {
    const { userId, boardId, content } = updateBoardDto;

    const board = await this.boardRepository.findUserById(boardId);
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    } else if (board.user.id !== userId) {
      throw new ForbiddenException('게시글 작성자만 수정할 수 있습니다.');
    }

    this.boardRepository.update(boardId, { content });
  }

  async deleteBoard(deleteBoardDto: DeleteBoardDto) {
    const { userId, boardId } = deleteBoardDto;

    const board = await this.boardRepository.findUserById(boardId);
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    } else if (board.user.id !== userId) {
      throw new ForbiddenException('게시글 작성자만 수정할 수 있습니다.');
    }

    this.boardRepository.delete({ id: boardId });
  }

  async getLastBoardList(count: number, max_id: number) {
    return await this.boardRepository.findLastBoardList(count, max_id);
  }

  async getUserBoards(getUserBoardsDto: GetUserBoardsDto) {
    const { userId, count, maxId } = getUserBoardsDto;

    return await this.boardRepository.findLastBoardListByUserId(
      count,
      maxId,
      userId,
    );
  }
}
