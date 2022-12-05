import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Query,
  Param,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { GetProfileInfoDto } from './dto/get-profile-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FollowDto } from './dto/follow.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile-info')
  getUserInfo(@Query(ValidationPipe) getProfileInfoDto: GetProfileInfoDto) {
    return this.userService.getUserInfo(getProfileInfoDto);
  }

  @Patch('/info')
  @UseInterceptors(FileInterceptor('image'))
  updateUserInfo(
    @UploadedFile() image: Express.Multer.File,
    @Body(ValidationPipe) updateUserInfoDto: UpdateUserInfoDto,
  ) {
    return this.userService.updateUserInfo(updateUserInfoDto, image);
  }

  @Post('/follow')
  addFollow(@Body(ValidationPipe) followDto: FollowDto) {
    return this.userService.addFollow(followDto);
  }

  @Delete('/follow')
  deleteFolllow(@Body(ValidationPipe) followDto: FollowDto) {
    return this.userService.deleteFollow(followDto);
  }

  @Get('/follow/:userId')
  getFollowList(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('viewer', ParseIntPipe) viewerId: number,
  ) {
    return this.userService.getFollowList(userId, viewerId);
  }
}
