import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { GetMapDto } from './dto/get-map.dto';
import { MapService } from './map.service';
import { Request } from 'express';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}
  @Post('/')
  getBoardList(
    @Body(ValidationPipe) getMapDto: GetMapDto,
    @Req() req: Request,
  ) {
    console.log(getMapDto);
    return this.mapService.findWithInRange(getMapDto, req.session.userId);
  }

  @Get('/map-reversegeocode/*')
  getUserLocation(@Req() req: Request) {
    return this.mapService.getGeoLocation(req);
  }
}
