import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { GetMapDto } from './dto/get-map.dto';
import { ResponseInterceptor } from '../interceptor/responseInterceptor';
import { MapService } from './map.service';
import { Request } from 'express';

@Controller('map')
@UseInterceptors(ResponseInterceptor)
export class MapController {
  constructor(private readonly mapService: MapService) {}
  @Post('/')
  getBoardList(@Body(ValidationPipe) getMapDto: GetMapDto) {
    console.log(getMapDto);
    return this.mapService.findWithInRange(getMapDto);
  }

  @Get('/map-reversegeocode/*')
  getUserLocation(@Req() req: Request) {
    return this.mapService.getGeoLocation(req);
  }
}
