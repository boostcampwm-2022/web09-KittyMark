import { io } from 'socket.io-client';

// interface ServerToClientEvents {
//   noArg: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;
// }

// interface ClientToServerEvents {
//   hello: () => void;
// }

const createSocket = () => {
  console.log('asd');
  const socket = io('http://localhost:2000/dm', {
    transports: ['websocket'],
  });
  socket.on('connect', () => {
    // 로그인하면 소켓 연결
    console.log(`[ID:${socket.id}] Socket is connected!`);
    socket.emit('init', { userId: 1 });
    // 메시지 보내기
    socket.emit('chat', { sender: 1, reciever: 3, chatRoomId: 5, text: 'asd' });
    // 때 enter 이벤트 발생시키기
    socket.emit('enter', { userId: 1, chatRoomId: 5, lastMessage: 8 });
    // 1:1 채팅방 퇴장할 때 exit 이벤트 발생시키기
    socket.emit('exit', { userId: 1, chatRoomId: 5, lastSeenChat: 12 });
    console.log();
  });
  socket.on('chat', (data) => {
    const { sender, chatRoomId, text } = data;
    console.log(`[ID:${socket.id}]`);
    console.log(
      `메세지가 왔습니다. 보낸 이 : ${sender}, 채팅방아이디: ${chatRoomId}, 내용 : ${text}`,
    );
  });
};

export default createSocket;

// export const initSocketConnection = () => {
//   if (socket) return;
//   socket.connect();
// };

// export default {socket, initSocketConnection};{ initSocketConnection };

// const SOCKET_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:2000'
//     : process.env.REACT_APP_SOCKET_URL!;

// export function createSocket() {
//   const socket = io(SOCKET_URL, { transports: ['websocket'] });
//   socket.on('connect', () => {
//     console.log(`[ID:${socket.id}] Socket is connected!`);
//     socket.emit('save-user-info');
//   });

//   socket.on('error', () => {
//     console.log(`[ID:${socket.id}] Socket Error!`);
//     socket.disconnect();
//   });

//   socket.on('message from server', (data: string) => {
//     console.log(`[SERVER] ${data}`);
//   });

//   socket.on('disconnect', () => {
//     console.log(`[ID:${socket.id}] Socket is disconnected!`);
//   });

//   return socket;
// }
