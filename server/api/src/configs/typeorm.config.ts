import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Board } from '../board/board.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Photo } from '../board/photo.entity';
import { Comment } from '../comment/comment.entity';
import { Follow } from '../user/follow/follow.entity';
import { Like } from '../like/like.entity';
import { DMRoom } from '../dm/dmroom.entity';

dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Board, Photo, Comment, Follow, Like, DMRoom],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: false,
  timezone: 'z',
  logging: false,
  charset: 'utf8mb4',
  legacySpatialSupport: false,
};
