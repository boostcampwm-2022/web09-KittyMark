import { Injectable } from '@nestjs/common';
import { GetMapDto } from './dto/get-map.dto';
import { BoardRepository } from 'board/board.repository';

@Injectable()
export class MapService {
  constructor(private readonly boardRepository: BoardRepository) {}
  async findWithInRange(getMapDto: GetMapDto) {
    return await this.boardRepository.findWithInRange(getMapDto);
  }
}
