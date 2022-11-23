import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Photo } from './photo.entity';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  isStreet: boolean;

  @Column()
  location: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.boards)
  user: User;

  @OneToMany(() => Photo, (photo) => photo.board)
  photos: Photo[];
}
