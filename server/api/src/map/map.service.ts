import { Injectable } from '@nestjs/common';
import { GetMapDto } from './dto/get-map.dto';
import { BoardRepository } from '../board/board.repository';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class MapService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly httpService: HttpService,
  ) {}
  async findWithInRange(getMapDto: GetMapDto, viewerId: number) {
    return await this.boardRepository.findWithInRange(getMapDto, viewerId);
  }

  async getGeoLocation(req: Request) {
    const option = {
      method: 'get',
      url:
        'https://naveropenapi.apigw.ntruss.com' + req.url.replace('/map', ''),
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_MAPS_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': process.env.NAVER_MAPS_CLIENT_SECRET,
      },
    };
    const response = this.httpService.request(option).pipe(map((r) => r.data));
    return await firstValueFrom(response);
  }
}
