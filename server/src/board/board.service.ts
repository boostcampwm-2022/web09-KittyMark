import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoardDto';
import { Board } from './board.entity';
import { UserRepository } from '../user/user.repository';
import { Photo } from './photo.entity';
import { UpdateBoardDto } from './dto/updateBoaedDto';
import { DeleteBoardDto } from 'board/dto/deleteBoardDto';
import { plainToInstance } from 'class-transformer';
import { BoardRepository } from 'board/board.repository';
import { PhotoRepository } from 'board/photo.repository';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly photoRepository: PhotoRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto) {
    const { content, images, isStreet, location, longitude, latitude, userId } =
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

    images.forEach((url) => {
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
