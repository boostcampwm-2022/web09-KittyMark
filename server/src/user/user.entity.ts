import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OauthInfo } from './user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  oauth_info: OauthInfo;

  @Column()
  profile_url: string;
}
