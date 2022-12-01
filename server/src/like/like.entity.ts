import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from 'board/board.entity';
import { User } from '../user/user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (board) => board.likes, {
    onDelete: 'CASCADE',
  })
  board: Board;

  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  user: User;
}
