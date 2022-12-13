import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OauthInfo } from 'src/auth/model/oauth-info.enum';

export class CreateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  userName: string;

  @IsNotEmpty()
  @IsEnum(OauthInfo)
  oauthInfo: OauthInfo;
}
