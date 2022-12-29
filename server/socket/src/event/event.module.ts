import { Module } from '@nestjs/common';
import { Chat, ChatSchema } from '@schemas/chat.schema';
import { ChatRepository } from '@repository/chat.repository';
import { EventsGateway } from './event.gateway';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  providers: [EventsGateway, ChatRepository],
  exports: [MongooseModule],
})
export class EventsModule {}
