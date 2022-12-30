import { InjectRepository } from '@nestjs/typeorm';
import { DMRoom } from './dmroom.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DMRoomRepository {
  constructor(
    @InjectRepository(DMRoom) private DmRepository: Repository<DMRoom>,
  ) {}

  async getListByUserId(userId: number) {
    return await this.DmRepository.find({
      where: [{ participant1: userId }, { participant2: userId }],
    });
  }
}
