import {
  Get,
  Controller,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Query,
  Patch,
  Body,
} from '@nestjs/common';
import { DmService } from './dm.service';
import { GetMessageDto } from './dto/get-message.dto';
import { UpdateLastSeenChatDto } from './dto/update-lastSeenChat.dto';

@Controller('dm')
export class DmController {
  constructor(private readonly dmService: DmService) {}

  @Get(':userId')
  getChatRoomLists(@Param('userId', ParseIntPipe) userId: number) {
    return this.dmService.getChatRoomLists(userId);
  }

  @Get('')
  getMessages(@Query(ValidationPipe) getMessageDto: GetMessageDto) {
    return this.dmService.getMessages(getMessageDto);
  }

  @Patch('/lastSeenDM')
  updateLastSeenDM(
    @Body(ValidationPipe) updateLastSeenChatDto: UpdateLastSeenChatDto,
  ) {
    console.log('lastseendm ', updateLastSeenChatDto);
    return this.dmService.updateLastSeenDM(updateLastSeenChatDto);
  }
}
