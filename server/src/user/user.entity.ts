import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OauthInfo } from '../auth/model/oauth-info.enum';
import { Board } from '../board/board.entity';
import { Comment } from 'src/comment/comment.entity';
import { Like } from '../like/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  email: string;

  @Column()
  oauthInfo: OauthInfo;

  @Column()
  profileUrl: string;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
