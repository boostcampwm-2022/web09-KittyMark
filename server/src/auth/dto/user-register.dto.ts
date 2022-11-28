import { IsNotEmpty } from 'class-validator';
import { OauthInfo } from '../model/oauth-info.enum';

export class RegisterUserDto {
  @IsNotEmpty()
  email: string;

  // @IsNotEmpty()
  // image: Express.Multer.File;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  oauthInfo: OauthInfo;
}
