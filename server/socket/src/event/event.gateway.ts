import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { ChatRepository } from '@repository/chat.repository';

@WebSocketGateway({
  namespace: 'dm',
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatRepository: ChatRepository) {}
  private logger = new Logger('Gateway');
  @WebSocketServer() namespace: Namespace;
  sockets = new Map();

  afterInit() {
    this.namespace.adapter.on('create-room', (room) => {});

    this.namespace.adapter.on('join-room', (room, id) => {
      console.log(`Room ${room}에 조인했습니다`);
    });

    // client
    // server에서 api 요청해서 채팅방리스트를 받으면 각 방 id가 있음.
    // chatroom = [{id: 1, participant1: 10, participant2: 12}, {id: 3, participant1: 10, participant2: 17}]
    // MongoDB -> message {chatroomId: 1, content: 'hi'}
    // 채팅방 UI에서 프로퍼티로 id를 가지고 있다가 하나를 클릭하면 그 id로 아래처럼 socket room join 하면 됌.
    // socket.join("room:"+room.id);
    // socket.join('room:1'); -> a,b 채팅
    // socket.join('room:2'); -> b,c 채팅
    // socket.join('room:3'); -> a,c 채팅
    // socket.to('room:1').emit("chat", "hi"); -> 하면 server를 거쳐서 가지는지 아니면 그냥 그 방의 사람들한테 직통배송하는지..
    // 참여자A가 room1에 조인했다가 leave해도 다시 room1으로 조인하면 그 방으로 들어와짐.

    // server
    // room join 요청 들어오면 그때까지 도착한 메세지들 확인해서 마지막으로 확인한 메세지 업데이트하기

    this.namespace.adapter.on('leave-room', (room, id) => {
      console.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    });

    this.namespace.adapter.on('delete-room', (roomName) => {
      console.log();
    });
  }

  // 로그인 했을 때 소켓 연결
  //

  @SubscribeMessage('init')
  handeleSocketList(
    @MessageBody() data: { userId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    this.sockets.set(`User${data.userId}`, socket);
  }

  @SubscribeMessage('chat')
  handleMessage(
    @MessageBody()
    data: {
      sender: number;
      receiver: number;
      chatRoomId: number;
      text: string;
    },
    @ConnectedSocket() socket: Socket,
  ) {
    const { sender, receiver, chatRoomId, text } = data;
    this.logger.log('메세지 받음');
    // mongoDB에 chatRoomId와 함께 채팅메시지 저장하기
    const message = this.chatRepository.saveMessage(
      data.chatRoomId,
      data.sender,
      data.text,
    );
    // 소켓으로 상대방에게 메세지 보내기
    const targetSocket = this.sockets.get(`User${receiver}`);
    if (targetSocket)
      targetSocket.emit('chat', {
        sender,
        chatRoomId,
        text,
      });

    // 스스로에게 보내 테스트
    // socket.emit('chat', { sender: data.sender, text: data.text });
  }

  @SubscribeMessage('enter')
  handleEnter(
    @MessageBody()
    data: { userId: number; chatRoomId: number; lastMessage: number },
    @ConnectedSocket() socket: Socket,
  ) {
    const { userId, chatRoomId, lastMessage } = data;
    // 채팅방 입장시 가장 최신 메시지로 마지막으로 본 메시지 업데이트하기 -> mysql api 서버로 요청보내기? or 여기서 mysql 불러서 업데이트?
    // api 요청
    // 단점: 굳이 api 서버를 한번 더 거쳐서 서버 부담을 줄 수 있다.
    // mysql db 직접 접근
    // 단점: chatroom.entity와 repository를 socket 폴더에서도 접근하기 위해 server/dao 하위로 옮겨서 관리해야한다.
  }

  @SubscribeMessage('exit')
  handleExit(
    @MessageBody()
    data: { userId: number; chatRoomId: number; lastSeenChat: number },
    @ConnectedSocket() socket: Socket,
  ) {
    const { userId, chatRoomId, lastSeenChat } = data;
    //마지막으로 본 메시지 업데이트하기
  }

  // @SubscribeMessage('joinRoom')
  // handleJoinRoom(
  //   @MessageBody() data: { roomId: number },
  //   @ConnectedSocket() socket: Socket,
  // ) {
  //   const { roomId } = data;
  //   socket.join('room:' + roomId);
  // }

  // 실시간 1:1 채팅방에 접속중인지 아닌지 정보는 필요할 듯
  // 프론트에서 메시지 입력 후 전송 -> 소켓 서버로 메시지 도착(보낸이, 받는이, 시각, 내용)
  // -> 1:1 채팅방 접속중이면 메시지가 바로 올라옴
  // -> 채팅방 목록을 보고 있으면, 최근 메세지와 쌓인 메세지 개수 + 채팅방 순서가 업데이트되어야함.
  // -> 채팅방 외 기능을 보고 있으면, DM 버튼에 알림 표시만

  // 읽음 안읽음 하나?
  // 입력중 표시 하나?

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`소켓이 연결되었습니다. ${socket.id}`);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`소켓 연결이 끊겼습니다. ${socket.id}`);
  }
}
