import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { BoardModule } from 'board/board.module';

@Module({
  imports: [BoardModule],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
