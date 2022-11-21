import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
// import { AuthDto } from './auth.dto';
// import { Cache } from 'cache-manager';
import { Request } from 'express';
import { redisClient } from 'src/redis';

declare module 'express-session' {
  interface SessionData {
    userEmail: string;
    isLogined: boolean;
  }
}

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  // 홈페이지에서 로그인 확인 요청시 redis에서 세션 id 확인
  async validateLogin(request: Request) {
    const user = redisClient.get(request.sessionID);
    if (!user) return { code: 500, message: 'Unauthorized User' };
    else {
      return { code: 200, message: 'SUCCESS' };
    }
  }

  // // 로그인요청시 기존유저인지 검증 아니라면 회원가입 페이지로
  async login(email: string, request: Request) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      request.session.isLogined = true;
      request.session.userEmail = email;
      await redisClient.set(request.sessionID, email);
      return {
        code: 200,
        userId: user.id,
        message: 'Success',
      };
    } else {
      return {
        code: 200,
        message: 'Register Required',
        redirect: true,
        email: email,
      };
    }
  }

  async logout(request: Request) {
    await redisClient.del(request.sessionID);
    request.session.destroy((err) => {
      if (err) {
        console.log(err);
        return { code: 500, message: 'Fail' };
      } else {
        return { code: 200, message: 'Success' };
      }
    });
  }
}
