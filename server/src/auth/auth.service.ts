import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
// import { redisClient } from 'src/utils/redis';
import { OauthInfo } from './model/oauth-info.enum';
import { OauthNaverDto } from './dto/oauth-naver.dto';
import { UserRepository } from '../user/user.repository';
import { firstValueFrom, map } from 'rxjs';
import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpService: HttpService,
    @Inject('REDIS_CLIENT')
    private readonly RedisClient: RedisClientType<
      RedisModules,
      RedisFunctions,
      RedisScripts
    >,
  ) {}

  // 홈페이지에서 로그인 확인 요청시 redis에서 세션 id 확인
  async validateLogin(request: Request) {
    const result = await this.RedisClient.get(request.sessionID);
    if (result && parseInt(result) === request.session.userId) {
      return true;
    } else {
      throw new UnauthorizedException('This user is an unauthorized user');
    }
  }

  // 로그인요청시 기존유저인지 검증 아니라면 회원가입 페이지로
  async login(email: string, request: Request) {
    const user = await this.userRepository.findByOauthInfo(
      email,
      OauthInfo.NAVER,
    );

    if (user) {
      await this.RedisClient.set(request.sessionID, user.id);
      await this.RedisClient.expire(request.sessionID, 60 * 60 * 24 * 30);
      request.session.userId = user.id;

      return {
        statusCode: 200,
        data: {
          userId: user.id,
          userName: user.name,
          userProfileUrl: user.profileUrl,
        },
        message: 'Success',
      };
    } else {
      return {
        statusCode: 200,
        message: 'Register Required',
        redirect: true,
        email: email,
      };
    }
  }

  async logout(request: Request) {
    await this.RedisClient.del(request.sessionID);
    request.session.destroy((err) => {
      if (err) {
        console.log(err);
        return { statusCode: 500, message: 'Fail' };
      } else {
        return { statusCode: 200, message: 'Success' };
      }
    });
  }

  async loginNaver(oauthNaverDto: OauthNaverDto, request: Request) {
    const { accessToken, tokenType } = await this.getNaverToken(oauthNaverDto);

    const email = await this.getUserEmail(accessToken, tokenType);

    return await this.login(email, request);
  }

  async getNaverToken(oauthNaverDto: OauthNaverDto): Promise<{
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
  }> {
    const { authorizationCode, state } = oauthNaverDto;
    const url =
      'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
      process.env.NAVER_CLIENT_ID +
      '&client_secret=' +
      process.env.NAVER_CLIENT_SECRET +
      '&code=' +
      authorizationCode +
      '&state=' +
      state;

    const option = {
      method: 'post',
      url: url,
    };

    const response = this.httpService.request(option).pipe(map((r) => r.data));
    const data = await firstValueFrom(response);

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
    };
  }

  async getUserEmail(accessToken: string, tokenType: string): Promise<string> {
    const userInfoRequestURL = `https://openapi.naver.com/v1/nid/me`;
    const option = {
      method: 'get',
      url: userInfoRequestURL,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    };
    const response = this.httpService.request(option).pipe(map((r) => r.data));
    const data = await firstValueFrom(response);

    return data.response.email;
  }
}
