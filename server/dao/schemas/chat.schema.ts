import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsString } from 'class-validator';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Chat {
  @Prop({ required: true, type: mongoose.Schema.Types.Number })
  chatRoomId: number;

  @Prop({ required: true, type: mongoose.Schema.Types.Number })
  sender: number;

  @Prop({ required: true })
  @IsString()
  content: string;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

// message {
//     id: fjaoijdf-1348-dga0g,
//     ChatRoomId: 3,
//     sender: 1,
//     content: '안녕하세요~',
//     createdAt: '2022-12-26T12:00:01',
// }
