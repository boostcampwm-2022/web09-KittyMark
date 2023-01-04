export interface DMEvent {
  sender: number;
  receiver: number;
  dmRoomId: number;
  content: string;
}

export interface InitEvent {
  userId: number;
}
