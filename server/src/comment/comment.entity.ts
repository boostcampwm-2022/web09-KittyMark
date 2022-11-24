import { Board } from 'board/board.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Board, (board) => board.comments)
  @JoinColumn()
  board: Board;

  @OneToOne(() => Comment, (comment) => comment.rootComment)
  @JoinColumn()
  rootComment: Comment;
}
