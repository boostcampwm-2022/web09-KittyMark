import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoardDto';
import { Board } from './board.entity';
import { UserRepository } from '../user/user.repository';
import { Photo } from './photo.entity';
import { UpdateBoardDto } from './dto/updateBoaedDto';
import { DeleteBoardDto } from 'board/dto/deleteBoardDto';
import { plainToInstance } from 'class-transformer';
import { BoardRepository } from 'board/board.repository';
import { PhotoRepository } from 'board/photo.repository';
import { S3Service } from 'src/S3/S3.service';

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
    const boardInfo = {
      content,
      isStreet,
      location,
      latitude,
      longitude,
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

  updateBoard(updateBoardDto: UpdateBoardDto) {
    const { boardId, content } = updateBoardDto;
    this.boardRepository.update(boardId, { content });
  }

  deleteBoard(deleteBoardDto: DeleteBoardDto) {
    this.boardRepository.delete({ id: deleteBoardDto.boardId });
  }

  async getLastBoardList(count: number, max_id: number) {
    return await this.boardRepository.findLastBoardList(count, max_id);
  }
}
