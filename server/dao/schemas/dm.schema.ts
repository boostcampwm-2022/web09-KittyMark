import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class DM extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.Number })
  dmRoomId: number;

  @Prop({ required: true, type: mongoose.Schema.Types.Number })
  sender: number;

  @Prop({ required: true })
  content: string;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  toClient(): { id: string; sender: number; content: string; createdAt: Date } {
    const obj = {
      id: this._id,
      sender: this.sender,
      content: this.content,
      createdAt: this.createdAt,
    };

    return obj;
  }
}

export const DMSchema = SchemaFactory.createForClass(DM);

DMSchema.loadClass(DM);

// DMSchema.methods.toClient = function () {
//   const obj = {
//     id: this._id,
//     sender: this.sender,
//     content: this.content,
//     createdAt: this.createdAt,
//   };

//   return obj;
// };

// message {
//     id: fjaoijdf-1348-dga0g,
//     ChatRoomId: 3,
//     sender: 1,
//     content: '안녕하세요~',
//     createdAt: '2022-12-26T12:00:01',
// }
