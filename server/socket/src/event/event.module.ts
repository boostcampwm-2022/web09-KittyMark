import { Module } from '@nestjs/common';
import { DM, DMSchema } from '@schemas/dm.schema';
import { DMRepository } from '@repository/dm.repository';
import { EventsGateway } from './event.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { DmEventService } from './dmEvent.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: DM.name, schema: DMSchema }]),
  ],
  providers: [EventsGateway, DMRepository, DmEventService],
  exports: [MongooseModule],
})
export class EventsModule {}
