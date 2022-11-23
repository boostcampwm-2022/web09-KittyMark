import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoardDto';
import { Board } from './board.entity';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { UpdateBoardDto } from './dto/updateBoaedDto';
import { DeleteBoardDto } from 'board/dto/deleteBoardDto';
import { plainToClass } from 'class-transformer';
@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
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

    const board = plainToClass(Board, boardInfo);
    await this.boardRepository.save(board);

    images.forEach((url) => {
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
    this.boardRepository.update(boardId, { content: content });
  }

  deleteBoard(deleteBoardDto: DeleteBoardDto) {
    this.boardRepository.delete({ id: deleteBoardDto.boardId });
  }

  async getLastBoardList(count: number, max_id: number) {
    const qb = await this.boardRepository
      .createQueryBuilder('board')
      .select(['board', 'user.id', 'user.name', 'user.profileUrl', 'photo.url'])
      .leftJoin('board.photos', 'photo')
      .leftJoin('board.user', 'user')
      .orderBy('board.createdAt', 'DESC');

    let boards;

    if (max_id != -1) {
      const lastBoard = await this.boardRepository.findOneBy({ id: max_id });
      boards = await qb
        .andWhere('board.created_at < :created_at', {
          created_at: lastBoard.createdAt,
        })
        .getMany();
    } else {
      boards = await qb.getMany();
    }

    boards = boards.slice(0, count);
    const _count = boards.length;
    const nextMaxId = boards[0].id;
    return { boards, count: _count, nextMaxId };
  }
}
