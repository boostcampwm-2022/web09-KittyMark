import { IsNotEmpty } from 'class-validator';
// import { OauthInfo } from '../model/OauthInfo.enum';

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
