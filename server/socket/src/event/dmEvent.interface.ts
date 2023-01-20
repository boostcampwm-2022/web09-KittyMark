export interface DMEvent {
  sender: number;
  receiver: number;
  dmRoomId: number;
  content: string;
  requestId: number;
}

export interface InitEvent {
  userId: number;
}
