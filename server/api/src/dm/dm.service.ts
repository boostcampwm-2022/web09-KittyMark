import { Injectable } from '@nestjs/common';
import { DMRoomRepository } from './dmroom.repository';
import { DMRepository } from '@repository/dm.repository';
import { GetMessageDto } from './dto/get-message.dto';
import { UpdateLastSeenChatDto } from './dto/update-lastSeenChat.dto';

@Injectable()
export class DmService {
  constructor(
    private readonly dmRoomRepository: DMRoomRepository,
    private readonly dmRepository: DMRepository,
  ) {}

  async getChatRoomLists(userId: number) {
    const result = await this.dmRoomRepository.getListByUserId(userId);
    const dmrooms = result.reduce((acc, curr) => {
      acc.push({
        ...curr,
        recentMessage: this.dmRepository.findRecentMessageByRoomId(curr.id),
      });
      return acc;
    }, []);

    dmrooms.sort(function (a, b) {
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

    const unSeenMsgCnt = 0;

    return { dmrooms, unSeenMsgCnt };
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

      const cnt = messages.length;
      const next_max_id = messages[cnt - 1].id;
      this.dmRoomRepository.updateLastSeenChat(dmRoomId, userId, next_max_id);

      return {
        dmRoomId,
        messages,
        count: cnt,
        next_max_id,
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

        const cnt = messages.length;
        const next_max_id = messages[cnt - 1].id;
        this.dmRoomRepository.updateLastSeenChat(
          dmRoom.id,
          userId,
          next_max_id,
        );

        if (messages.length > 0) {
          return {
            dmRoomId: dmRoom.id,
            messages,
            count: cnt,
            next_max_id,
          };
        } else {
          return {
            dmRoomId: dmRoom.id,
            messages,
            count: 0,
            next_max_id: -1,
          };
        }
      } else {
        // 해당 유저들에 대해 dmRoom이 존재하지 않으면 생성하기
        const createdRoom = await this.dmRoomRepository.createRoomByUsers(
          userId,
          otherUserId,
        );
        const messages = [];

        return {
          message: '채팅방이 생성되었습니다.',
          dmRoomId: createdRoom.id,
          messages,
          count: 0,
          next_max_id: -1,
        };
      }
    }
  }

  async updateLastSeenDM(updateLastSeenChatDto: UpdateLastSeenChatDto) {
    const { dmRoomId, userId, messageId } = updateLastSeenChatDto;
    if (!messageId) {
      return;
    }
    return await this.dmRoomRepository.updateLastSeenChat(
      dmRoomId,
      userId,
      messageId,
    );
  }
}
