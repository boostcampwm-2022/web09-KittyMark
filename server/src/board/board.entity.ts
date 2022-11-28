import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Photo } from './photo.entity';
import { Comment } from 'src/comment/comment.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  isStreet: boolean;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

  // Todo 연관관계 매핑필요
  @Column({ nullable: true })
  like: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn()
  user: User;

  @OneToMany(() => Photo, (photo) => photo.board)
  photos: Photo[];

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];
}
