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
    return await this.DmRoomRepository.createQueryBuilder('dmRoom')
      .leftJoin('dmRoom.participant1', 'p1')
      .leftJoin('dmRoom.participant2', 'p2')
      .where('dmRoom.participant1 = :userId OR dmRoom.participant2 = :userId', {
        userId,
      })
      .select([
        'dmRoom.id',
        'dmRoom.participant1',
        'dmRoom.participant2',
        'p1.id',
        'p1.name',
        'p1.profileUrl',
        'p2.id',
        'p2.name',
        'p2.profileUrl',
      ])
      .getMany();
  }

  async getRoomIdByUsers(userId: number, otherUserId: number) {
    if (userId < otherUserId) {
      return await this.DmRoomRepository.createQueryBuilder('dmRoom')
        .where('dmRoom.participant1 = :userId', { userId })
        .andWhere('dmRoom.participant2 = :otherUserId', { otherUserId })
        .getOne();
    } else {
      return await this.DmRoomRepository.createQueryBuilder('dmRoom')
        .where('dmRoom.participant1 = :otherUserId', { otherUserId })
        .andWhere('dmRoom.participant2 = :userId', { userId })
        .getOne();
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
        participant1: otherUserId,
        participant2: userId,
        lastSeenChatOfParticipant1: null,
        lastSeenChatOfParticipant2: null,
      });
      await this.DmRoomRepository.save(room);
    }

    return room;
  }
}
