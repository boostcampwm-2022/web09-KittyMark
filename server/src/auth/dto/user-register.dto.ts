import { IsEnum, IsNotEmpty } from 'class-validator';
import { OauthInfo } from '../model/oauth-info.enum';

export class RegisterUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsEnum(OauthInfo)
  oauthInfo: OauthInfo;
}
