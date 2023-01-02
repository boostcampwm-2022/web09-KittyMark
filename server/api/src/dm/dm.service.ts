import { Injectable } from '@nestjs/common';
import { DMRoomRepository } from './dmroom.repository';
import { DMRepository } from '@repository/dm.repository';
import { GetMessageDto } from './dto/get-message.dto';

@Injectable()
export class DmService {
  constructor(
    private readonly dmRoomRepository: DMRoomRepository,
    private readonly dmRepository: DMRepository,
  ) {}

  async getChatRoomLists(userId: number) {
    const chatRooms = await this.dmRoomRepository.getListByUserId(userId);
    const results = chatRooms.reduce((acc, curr) => {
      acc.push({
        ...curr,
        recentMessage: this.dmRepository.findRecentMessageByRoomId(curr.id),
      });
      return acc;
    }, []);

    results.sort(function (a, b) {
      const dateA = new Date(a.recentMessage.createdAt);
      const dateB = new Date(b.recentMessage.createdAt);
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });

    return results;
  }

  async getMessages(getMessageDto: GetMessageDto) {
    const { userId, otherUserId, dmRoomId, count, maxId } = getMessageDto;

    if (dmRoomId) {
      //dmRoomId로 메시지 내역 찾기
      const messages = await this.dmRepository.findByRoomIdFrom(
        dmRoomId,
        maxId,
        count,
      );
      // const next_max_id = ;

      return {
        dmRoomId,
        messages,
        count: messages.length,
        next_max_id: messages[messages.length - 1].id,
      };
    } else {
      // userId와 otherUserId로 dmRoomId 찾기
      const dmRoom = await this.dmRoomRepository.getRoomIdByUsers(
        userId,
        otherUserId,
      );

      if (dmRoom) {
        // 찾은 dmRoomId로 메시지 내역 찾기
        const messages = await this.dmRepository.findByRoomIdFrom(
          dmRoom.id,
          maxId,
          count,
        );

        return {
          dmRoomId: dmRoom.id,
          messages,
          count: messages.length,
          next_max_id: messages[messages.length - 1].id,
        };
      } else {
        // 해당 유저들에 대해 dmRoom이 존재하지 않으면 생성하기
        const createdRoom = await this.dmRoomRepository.createRoomByUsers(
          userId,
          otherUserId,
        );
        const messages = [];
        return {
          dmRoomId: createdRoom.id,
          messages,
          count: 0,
          next_max_id: -1,
        };
      }
    }
  }
}
