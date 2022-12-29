import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Chat, ChatDocument } from '@schemas/chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatRepository {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async findByRoomId(roomId: number) {
    const result = await this.chatModel
      .find()
      .where('chatRoomId')
      .equals(`${roomId}`);

    return result;
  }

  async findRecentMessageByRoomId(roomId: number) {
    const result = await this.chatModel.findOne(
      { chatRoomId: roomId },
      { sort: { $natural: -1 } },
    );

    return result;
  }

  async saveMessage(chatRoomId: number, sender: number, content: string) {
    return await this.chatModel.create({ chatRoomId, sender, content });
  }
}
