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
import { Geometry } from 'geojson';
import { GeometryTransformer } from 'board/board.util';
import { Like } from '../like/like.entity';

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

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    transformer: new GeometryTransformer(),
    nullable: true,
  })
  coordinate: Geometry;

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

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
