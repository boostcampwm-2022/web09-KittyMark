import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoardDto';
import { Board } from './board.entity';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { UpdateBoardDto } from './dto/updateBoaedDto';
import { DeleteBoardDto } from 'board/dto/deleteBoardDto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    private readonly userRepository: UserRepository,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto) {
    const { content, image, isStreet, location, longitude, latitude, userId } =
      createBoardDto;
    const user = await this.userRepository.findById(userId);
    const boardInfo = {
      description: content,
      isStreet,
      location,
      latitude,
      longitude,
      user,
    };
    const board = this.boardRepository.create(boardInfo);
    await this.boardRepository.save(board);

    image.forEach((url) => {
      const imageInfo = {
        url,
        board,
      };
      this.photoRepository.save(imageInfo);
    });

    return { boardId: board.id };
  }

  updateBoard(updateBoardDto: UpdateBoardDto) {
    const { boardId, content } = updateBoardDto;
    this.boardRepository.update(boardId, { description: content });
  }

  deleteBoard(deleteBoardDto: DeleteBoardDto) {
    this.boardRepository.delete({ id: deleteBoardDto.boardId });
  }

  // Todo 갯수 만큼 가져오기 미완성
  async getBoardList(count, max_id) {
    const boards = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.photos', 'photo')
      .where('board.id= :id', { id: 2 })
      .getOne();
    console.log(boards, count, max_id);
  }
}
