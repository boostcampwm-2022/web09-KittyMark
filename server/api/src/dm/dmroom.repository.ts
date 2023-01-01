import { InjectRepository } from '@nestjs/typeorm';
import { DMRoom } from './dmroom.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DMRoomRepository {
  constructor(
    @InjectRepository(DMRoom) private DmRoomRepository: Repository<DMRoom>,
  ) {}

  async getListByUserId(userId: number) {
    return await this.DmRoomRepository.find({
      where: [{ participant1: userId }, { participant2: userId }],
    });
  }

  async getRoomIdByUsers(userId: number, otherUserId: number) {
    if (userId < otherUserId) {
      return await this.DmRoomRepository.findOne({
        where: { participant1: userId, participant2: otherUserId },
      });
    } else {
      return await this.DmRoomRepository.findOne({
        where: { participant1: otherUserId, participant2: userId },
      });
    }
  }

  async createRoomByUsers(userId: number, otherUserId: number) {
    let room: DMRoom;

    if (userId < otherUserId) {
      room = plainToInstance(DMRoom, {
        participant1: userId,
        participant2: otherUserId,
        lastSeenChatOfParticipant1: null,
        lastSeenChatOfParticipant2: null,
      });
      await this.DmRoomRepository.save(room);
    } else {
      room = plainToInstance(DMRoom, {
        participant1: userId,
        participant2: otherUserId,
        lastSeenChatOfParticipant1: null,
        lastSeenChatOfParticipant2: null,
      });
      await this.DmRoomRepository.save(room);
    }

    return room.id;
  }
}
