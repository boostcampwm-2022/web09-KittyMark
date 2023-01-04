import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DM, ChatDocument } from '@schemas/dm.schema';
import { Model } from 'mongoose';

@Injectable()
export class DMRepository {
  constructor(@InjectModel(DM.name) private dmModel: Model<ChatDocument>) {}

  async findByRoomId(roomId: number) {
    const result = await this.dmModel
      .find()
      .where('dmRoomId')
      .equals(`${roomId}`)
      .exec();

    return result;
  }

  async findByRoomIdFrom(roomId: number, maxId: string, count: number) {
    if (maxId === '-1') {
      const result = await this.dmModel
        .find({ dmRoomId: roomId }, 'sender content createdAt')
        .sort({ createdAt: -1, _id: -1 })
        .limit(count)
        .exec();
      return result;
    } else {
      const maxChat = await this.dmModel.findById(maxId).exec();

      console.log(maxChat);

      const result = await this.dmModel
        .find(
          {
            dmRoomId: roomId,
            createdAt: { $lte: maxChat.createdAt },
            _id: { $lt: maxChat.id },
          },
          'sender content createdAt',
        )
        .sort({ createdAt: -1, _id: -1 })
        .limit(count)
        .exec();

      return result;
    }
  }

  async findRecentMessageByRoomId(roomId: number) {
    const result = await this.dmModel
      .findOne({ dmRoomId: roomId }, 'sender content createdAt', {
        sort: { createdAt: -1, _id: -1 },
      })
      .exec();
    return result;
  }

  async saveMessage(dmRoomId: number, sender: number, content: string) {
    return await this.dmModel.create({
      dmRoomId,
      sender,
      content,
    });
  }
}
