import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async save(board: Board) {
    await this.boardRepository.save(board);
  }

  async create(board: Board) {
    await this.boardRepository.create(board);
  }

  async update(id: number, updatedData) {
    await this.boardRepository.update(id, updatedData);
  }

  async delete(idInfo) {
    await this.boardRepository.delete(idInfo);
  }

  async findLastBoardList(count: number, max_id) {
    // limit 혹은 take 적용 필요할 듯..
    console.log(1);
    const qb = await this.boardRepository
      .createQueryBuilder('board')
      .select(['board', 'user.id', 'user.name', 'user.profileUrl', 'photo.url'])
      .leftJoin('board.photos', 'photo')
      .leftJoin('board.user', 'user')
      .orderBy('board.createdAt', 'DESC');

    let boards;
    console.log(2);
    if (max_id !== -1) {
      console.log('id');
      const lastBoard = await this.boardRepository.findOneBy({ id: max_id });
      console.log(lastBoard);
      boards = await qb
        .andWhere('board.created_at < :created_at', {
          created_at: lastBoard.createdAt,
        })
        .getMany();
    } else {
      console.log(1);
      boards = await qb.getMany();
    }
    console.log(boards);
    if (boards.length !== 0) {
      boards = boards.slice(0, count);
      const _count = boards.length;
      const nextMaxId = boards[0].id;
      return { boards, count: _count, nextMaxId };
    }
    return {};
  }
}
