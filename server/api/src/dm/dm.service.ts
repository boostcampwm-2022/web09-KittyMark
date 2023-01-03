import { Injectable } from '@nestjs/common';
import { DMRoomRepository } from './dmroom.repository';
import { DMRepository } from '@repository/dm.repository';

@Injectable()
export class DmService {
  constructor(
    private readonly chatroomRepository: DMRoomRepository,
    private readonly chatRepository: DMRepository,
  ) {}

  async getChatRoomLists(userId: number) {
    const chatRooms = await this.chatroomRepository.getListByUserId(userId);
    const results = chatRooms.reduce((acc, curr) => {
      acc.push({
        ...curr,
        recentMessage: this.chatRepository.findRecentMessageByRoomId(curr.id),
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
}
