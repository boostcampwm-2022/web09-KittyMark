import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { OauthInfo } from './model/oauth-info.enum';
import { OauthNaverDto } from './dto/oauth-naver.dto';
import { OauthGithubDto } from './dto/oauth-github.dto';
import { UserRepository } from '../user/user.repository';
import { firstValueFrom, map } from 'rxjs';

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
  ) {}

  // 홈페이지에서 로그인 확인 요청시 redis에서 세션 id 확인
  async validateLogin(request: Request) {
    if (request.session.userId) {
      return true;
    } else {
      throw new UnauthorizedException('This user is an unauthorized user');
    }
  }

  // 로그인요청시 기존유저인지 검증 아니라면 회원가입 페이지로
  async login(email: string, request: Request, oauthInfo: OauthInfo) {
    const user = await this.userRepository.findByOauthInfo(email, oauthInfo);
    if (user) {
      request.session.userId = user.id;
      return {
        statusCode: 200,
        userId: user.id,
        userName: user.name,
        userProfileUrl: user.profileUrl,
      };
    } else {
      return {
        statusCode: 300,
        message: 'Redirect to /register',
        url: '/register',
        email,
        oauthInfo,
      };
    }
  }

  async logout(request: Request) {
    request.session.destroy((err) => {
      if (err) {
        console.log(err);
        throw new InternalServerErrorException();
      } else {
        return;
      }
    });
  }

  async loginNaver(oauthNaverDto: OauthNaverDto, request: Request) {
    const { accessToken, tokenType } = await this.getNaverToken(oauthNaverDto);

    const email = await this.getUserEmail(accessToken, tokenType);

    return await this.login(email, request, OauthInfo.NAVER);
  }

  async loginGithub(oauthGithubDto: OauthGithubDto, request: Request) {
    const { accessToken, tokenType } = await this.getGithubToken(
      oauthGithubDto,
    );

    const { id } = await this.getUserId(tokenType, accessToken);

    return await this.login(id, request, OauthInfo.GITHUB);
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

  async getGithubToken(
    oauthGithubDto: OauthGithubDto,
  ): Promise<{ accessToken: string; tokenType: string }> {
    const { authorizationCode } = oauthGithubDto;

    const option = {
      method: 'POST',
      url: 'https://github.com/login/oauth/access_token',
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: authorizationCode,
      },
      headers: {
        accept: 'application/json',
      },
    };

    const response = this.httpService.request(option).pipe(map((r) => r.data));
    const data = await firstValueFrom(response);

    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
    };
  }

  async getUserId(tokenType: string, accessToken: string) {
    const option = {
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: tokenType + ' ' + accessToken,
      },
    };

    const response = this.httpService.request(option).pipe(map((r) => r.data));
    const data = await firstValueFrom(response);

    return { id: data.login };
  }
}
