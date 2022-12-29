import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Board, (board) => board.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  board: Board;

  @OneToOne(() => Comment, (comment) => comment.rootComment)
  @JoinColumn()
  rootComment: Comment;
}
