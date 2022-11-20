import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { OauthNaverDto } from './oauth-naver.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OauthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  async loginNaver(oauthNaverDto: OauthNaverDto, request: Request) {
    console.log('loginService');
    const { accessToken, tokenType } = await this.getNaverToken(oauthNaverDto);

    console.log(accessToken);

    const email = await this.getUserEmail(accessToken, tokenType);

    console.log(email);

    return await this.authService.login(email, request);
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
