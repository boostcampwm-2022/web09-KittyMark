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
  Req,
} from '@nestjs/common';
import { GetProfileInfoDto } from './dto/get-profile-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FollowDto } from './dto/follow.dto';
import { Request } from 'express';

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
    @Req() req: Request,
  ) {
    return this.userService.updateUserInfo(
      updateUserInfoDto,
      image,
      req.session.userId,
    );
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
