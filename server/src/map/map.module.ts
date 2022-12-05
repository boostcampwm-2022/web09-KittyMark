import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { BoardModule } from 'board/board.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [BoardModule, HttpModule],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
