import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CheckNameDto } from './dto/check-name.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/nameCheck')
  @UsePipes(ValidationPipe)
  checkName(@Body() checkNameDto: CheckNameDto) {
    return this.userService.checkName(checkNameDto);
  }
  // TODO: 회원가입
}
