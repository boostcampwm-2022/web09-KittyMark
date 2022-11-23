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

  toEntity(): User {
    const user = new User();
    user.email = this.email;
    user.name = this.userName;
    user.profile_url = this.imageURL;
    user.oauth_info = OauthInfo.NAVER;
    return user;
  }
}
