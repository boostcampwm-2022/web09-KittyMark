import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DM, ChatDocument } from '@schemas/dm.schema';
import { Model } from 'mongoose';

@Injectable()
export class DMRepository {
  constructor(@InjectModel(DM.name) private chatModel: Model<ChatDocument>) {}

  async findByRoomId(roomId: number) {
    const result = await this.chatModel
      .find()
      .where('DMRoomId')
      .equals(`${roomId}`)
      .exec();

    return result;
  }

  async findByRoomIdFrom(roomId: number, maxId: string, count: number) {
    const maxChat = await this.chatModel.findById(maxId).exec();
    const result = await this.chatModel
      .find(
        { DMRoomId: roomId, createdAt: { $gt: maxChat.createdAt } },
        'sender content createdAt',
      )
      .sort({ createdAt: -1 })
      .limit(count)
      .exec();

    return result;
  }

  async findRecentMessageByRoomId(roomId: number) {
    const result = await this.chatModel.findOne(
      { DMRoomId: roomId },
      { sort: { $natural: -1 } },
    );

    return result;
  }

  async saveMessage(chatRoomId: number, sender: number, content: string) {
    return await this.chatModel.create({
      DMRoomId: chatRoomId,
      sender,
      content,
    });
  }
}
