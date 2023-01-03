import {Get, Controller, Param, ParseIntPipe, ValidationPipe, Query} from '@nestjs/common';
import { DmService } from './dm.service';
import {GetMessageDto} from "./dto/get-message.dto";
// import { GetMessageDto } from './dto/get-message.dto';

@Controller('dm')
export class DmController {
  constructor(private readonly dmService: DmService) {}

  @Get(':userId')
  getChatRoomLists(@Param('userId', ParseIntPipe) userId: number) {
    return this.dmService.getChatRoomLists(userId);
  }

  @Get('/:userId')
  getMessages(@Query(ValidationPipe) getMessageDto: GetMessageDto) {
    return;
  }
}
