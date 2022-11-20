import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
// import { AuthDto } from './auth.dto';
// import { Cache } from 'cache-manager';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  // 홈페이지에서 로그인 확인 요청시 redis에서 세션 id 확인
  async validateLogin(request: Request) {
    // await this.cacheManager.set('hi', true, 0);
    // const res = await this.cacheManager.get('hi');
    // console.log(res);

    // return res;

    if (!request.session.userEmail)
      return { code: 500, message: 'Unauthorized User' };
    // else {
    // const result = await this.cacheManager.get(request.session.userEmail);
    // if (result) {
    // 	return { code: 200, message: 'SUCCESS' };
    // }
    // }
  }

  // // 로그인요청시 기존유저인지 검증 아니라면 회원가입 페이지로
  async login(email: string, request: Request) {
    const user = await this.userService.findByEmail(email);

    console.log(user);
    console.log(request.session);
    if (user) {
      request.session.userEmail = email;
      return {
        code: 200,
        message: 'Success',
      };
      // await this.cacheManager.set(email, true, 10000);
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
    // await this.cacheManager.del(request.session.userEmail);
    request.session.destroy((err) => {
      if (err) {
        console.log(err);
        return { code: 500, message: 'Fail' };
      } else {
        return { code: 200, message: 'Success' };
      }
    });
  }

  // redis에 세션id 저장
  // async saveSessionId(sessionId: string) {
  // 	await this.cacheManager.set(sessionId, true);
  // }
}
