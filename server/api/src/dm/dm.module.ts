import { Module } from '@nestjs/common';
import { DM, DMSchema } from '@schemas/dm.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { DMRoom } from './dmroom.entity';
import { DmController } from './dm.controller';
import { DmService } from './dm.service';
import { DMRoomRepository } from './dmroom.repository';
import { DMRepository } from '@repository/dm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DMRoom]),
    MongooseModule.forFeature([{ name: DM.name, schema: DMSchema }]),
  ],
  controllers: [DmController],
  providers: [DmService, DMRoomRepository, DMRepository],
  exports: [MongooseModule],
})
export class DmModule {}
