import { InjectRepository } from '@nestjs/typeorm';
import { DMRoom } from './dmroom.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
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
        'dmRoom',
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
        lastSeenDMOfParticipant1: null,
        lastSeenDMOfParticipant2: null,
      });
      await this.DmRoomRepository.save(room);
    } else {
      room = plainToInstance(DMRoom, {
        participant1: otherUserId,
        participant2: userId,
        lastSeenDMOfParticipant1: null,
        lastSeenDMOfParticipant2: null,
      });
      await this.DmRoomRepository.save(room);
    }

    return room;
  }

  async updateLastSeenChat(
    dmRoomId: number,
    userId: number,
    messageId: string,
  ) {
    const room = await this.DmRoomRepository.createQueryBuilder('dmRoom')
      .where('dmRoom.id = :dmRoomId', { dmRoomId })
      .leftJoin('dmRoom.participant1', 'p1')
      .leftJoin('dmRoom.participant2', 'p2')
      .select(['dmRoom', 'p1.id', 'p2.id'])
      .getOne();
    if (room.participant1.id === userId) {
      room.lastSeenDMOfParticipant1 = messageId;
    } else if (room.participant2.id === userId) {
      room.lastSeenDMOfParticipant2 = messageId;
    } else {
      throw new NotFoundException(
        `유저 아이디 ${userId}를 채팅방 ${dmRoomId}에서 찾을 수 없습니다.`,
      );
    }
    return await this.DmRoomRepository.save(room);
  }
}
