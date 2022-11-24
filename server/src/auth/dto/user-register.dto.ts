import { IsNotEmpty } from 'class-validator';

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
