import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'bcamp',
  cors: {
    origin: ['주소'],
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() nsp: Namespace;

  afterInit() {
    this.nsp.adapter.on('create-room', (room) => {
      console.log();
    });

    this.nsp.adapter.on('join-room', (room, id) => {
      console.log();
    });

    this.nsp.adapter.on('delete-room', (roomName) => {
      console.log();
    });
  }
  // 실시간 1:1 채팅방에 접속중인지 아닌지 정보는 필요할 듯
  // 프론트에서 메시지 입력 후 전송 -> 소켓 서버로 메시지 도착(보낸이, 받는이, 시각, 내용)
  // -> 1:1 채팅방 접속중이면 메시지가 바로 올라옴 (소켓 서버)
  // -> 채팅방 목록을 보고 있으면, 최근 메세지와 쌓인 메세지 개수 + 채팅방 순서가 업데이트되어야함.
  // -> 채팅방 외 기능을 보고 있으면, DM 버튼에 알림 표시만

  // 읽음 안읽음 하나?
  // 입력중 표시 하나?
  handleConnection(@ConnectedSocket() socket: Socket) {}

  handleDisconnect(@ConnectedSocket() socket: Socket) {}
}
