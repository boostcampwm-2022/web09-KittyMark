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
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateNameDto } from './dto/validate-name.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  createUser(
    @UploadedFile() image: Express.Multer.File,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(image, createUserDto);
  }

  @Get('/nameCheck')
  checkName(@Query(ValidationPipe) validateNameDto: ValidateNameDto) {
    return this.userService.validateName(validateNameDto);
  }

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
