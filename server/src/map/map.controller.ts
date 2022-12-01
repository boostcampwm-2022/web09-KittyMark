import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { GetMapDto } from './dto/get-map.dto';
import { ResponseInterceptor } from '../interceptor/responseInterceptor';
import { MapService } from './map.service';

@Controller('map')
@UseInterceptors(ResponseInterceptor)
export class MapController {
  constructor(private readonly mapService: MapService) {}
  @Post('/')
  getBoardList(@Body(ValidationPipe) getMapDto: GetMapDto) {
    console.log(getMapDto);
    return this.mapService.findWithInRange(getMapDto);
  }
}
