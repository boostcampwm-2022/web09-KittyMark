import { Logger } from '@nestjs/common';
import {
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DMEvent, InitEvent } from './dmEvent.interface';
import { DmEventService } from './dmEvent.service';

@WebSocketGateway({
  namespace: 'dm',
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly dmEventService: DmEventService) {}
  private logger = new Logger('Gateway');
  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Socket Init Complete');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`소켓이 연결되었습니다. ${socket.id}`);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`소켓 연결이 끊겼습니다. ${socket.id}`);
  }

  @SubscribeMessage('init')
  async handleSocketList(
    @MessageBody() data: InitEvent,
    @ConnectedSocket() socket: Socket,
  ) {
    await this.dmEventService.init(data.userId, socket);
  }

  @SubscribeMessage('chat')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dm: DMEvent,
  ) {
    await this.dmEventService.chat(socket, dm, this.server);
  }
}
