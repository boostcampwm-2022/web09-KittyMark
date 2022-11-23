import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}
  //
  //   async save(board: Board) {
  //     await this.boardRepository.save(board);
  //   }
  //
  //   async create(board: Board) {
  //     await this.boardRepository.create(board);
  //   }
  //
  //   async update(id, updatedData) {
  //     await this.boardRepository.update(id,updatedData);
  //   }
  //
  //   async getLastBoardList(count, number) {}
}
