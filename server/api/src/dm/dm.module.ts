import { Module } from '@nestjs/common';
import { Chat, ChatSchema } from '@schemas/chat.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoom } from './chatroom.entity';
import { DmController } from './dm.controller';
import { DmService } from './dm.service';
import { ChatroomRepository } from './chatroom.repository';
import { ChatRepository } from '@repository/chat.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRoom]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [DmController],
  providers: [DmService, ChatroomRepository, ChatRepository],
  exports: [MongooseModule],
})
export class DmModule {}
