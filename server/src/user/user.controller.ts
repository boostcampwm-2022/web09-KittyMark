import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  // TODO: 회원가입
}
