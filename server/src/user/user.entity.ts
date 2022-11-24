import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OauthInfo } from '../auth/model/oauth-info.enum';
import { Board } from '../board/board.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  oauthInfo: OauthInfo;

  @Column()
  profileUrl: string;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];
}
