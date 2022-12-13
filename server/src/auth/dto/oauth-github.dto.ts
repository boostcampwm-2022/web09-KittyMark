import { IsNotEmpty } from 'class-validator';

export class OauthGithubDto {
  @IsNotEmpty()
  authorizationCode: string;
}
