import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { OauthNaverDto } from './oauth-naver.dto';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {
	constructor(private oauthService: OauthService) {}

	@Post('/naver')
	loginNaver(@Body() oauthNaverDto: OauthNaverDto, @Req() request: Request) {
		console.log('oauth/naver');
		return this.oauthService.loginNaver(oauthNaverDto, request);
	}
}
