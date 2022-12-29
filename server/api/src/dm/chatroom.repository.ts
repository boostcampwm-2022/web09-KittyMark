import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from './chatroom.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatroomRepository {
  constructor(
    @InjectRepository(ChatRoom) private DmRepository: Repository<ChatRoom>,
  ) {}

  async getListByUserId(userId: number) {
    return await this.DmRepository.find({
      where: [{ participant1: userId }, { participant2: userId }],
    });
  }
}
