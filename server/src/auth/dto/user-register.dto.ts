import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';
import { OauthInfo } from '../model/oauth-info.enum';

export class RegisterUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  imageURL: string;

  @IsNotEmpty()
  userName: string;

  // @IsNotEmpty()
  // oauthInfo: OauthInfo;
}
