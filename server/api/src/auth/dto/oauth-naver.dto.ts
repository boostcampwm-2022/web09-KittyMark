import { IsNotEmpty } from 'class-validator';

export class OauthNaverDto {
  @IsNotEmpty()
  authorizationCode: string;

  @IsNotEmpty()
  state: string;
}
