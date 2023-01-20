import { Injectable, Logger } from '@nestjs/common';
import { pubClient as Redis } from '../redis.adapter';
import { Server, Socket } from 'socket.io';
import { DMRepository } from '@repository/dm.repository';
import { DMEvent } from './dmEvent.interface';

@Injectable()
export class DmEventService {
  logger = new Logger('DmEventService');
  constructor(private readonly dmRepository: DMRepository) {}

  async init(userId: number, socket: Socket) {
    console.log('init');

    Redis.set(String(userId), socket.id);
  }

  async chat(client: Socket, dm: DMEvent, server: Server) {
    const { sender, receiver, dmRoomId, content, requestId } = dm;
    this.logger.log(`메세지 받음 ${sender}: [${content}]`);
    // const s = receiver + '';

    const message = await this.dmRepository.saveMessage(
      dmRoomId,
      sender,
      content,
    );

    console.log(dmRoomId, sender, message.id);
    // const response = await this.lastSeenRequest(dmRoomId, sender, message.id);

    if (message) {
      server.to(client.id).emit('chatResponse', {
        messageId: message.id,
        isSaved: true,
        requestId,
      });
    } else {
      server.to(client.id).emit('chatResponse', {
        messageId: message.id,
        isSaved: false,
        requestId,
      });
    }

    const target = await Redis.get(String(receiver)); // receiver의 소켓 아이디
    // const targetSocket = await Redis.get(client.id);
    if (target) {
      server.to(target).emit('chat', { content, messageId: message.id });
    }
  }

  // async lastSeenRequest(dmRoomId, userId, messageId) {
  //   const option = {
  //     method: 'PATCH',
  //     url: 'http://localhost:4000/dm/lastSeenDM',
  //     params: {
  //       dmRoomId,
  //       userId,
  //       messageId,
  //     },
  //   };

  //   try {
  //     return this.httpService.request(option).pipe(map((r) => r.data));
  //   } catch (err) {
  //     this.logger.error(err);
  //   }
  // }
}
