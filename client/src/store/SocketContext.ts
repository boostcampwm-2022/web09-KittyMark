import React from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io('http://localhost:2000/dm', {
  transports: ['websocket'],
});
export const SocketContext = React.createContext<Socket>(socket);

socket.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('socket server connected');
});

socket.on('disconnect', () => {
  // eslint-disable-next-line no-console
  console.log('socket server disconnected');
});
