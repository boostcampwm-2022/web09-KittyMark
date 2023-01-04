import { Injectable, Logger } from '@nestjs/common';
import { pubClient as Redis } from '../redis.adapter';
import { Server, Socket } from 'socket.io';
import { DMRepository } from '@repository/dm.repository';
import { DMEvent } from './dmEvent.interface';

@Injectable()
export class DmEventService {
  logger = new Logger('DmEventService');
  constructor(private readonly dmRepository: DMRepository) {}

  async init(userId, socket: Socket) {
    await Redis.set(userId, socket.id);
  }

  async chat(client: Socket, dm: DMEvent, server: Server) {
    const { sender, receiver, dmRoomId, content } = dm;
    this.logger.log(`메세지 받음 ${sender}: [${content}]`);
    // const s = receiver + '';

    await this.dmRepository.saveMessage(dmRoomId, sender, content);
    const target = await Redis.get(String(receiver));
    const targetSocket = await Redis.get(client.id);

    if (target && targetSocket) {
      server.to(target).emit('chat', content);
    }
  }
}
