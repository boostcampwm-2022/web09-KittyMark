import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetMapDto } from '../map/dto/get-map.dto';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async save(board: Board) {
    await this.boardRepository.save(board);
  }

  async create(board: Board) {
    await this.boardRepository.create(board);
  }

  async update(id: number, updatedData) {
    await this.boardRepository.update(id, updatedData);
  }

  async delete(idInfo) {
    await this.boardRepository.delete(idInfo);
  }

  async findOneById(boardId: number) {
    return await this.boardRepository.findOneBy({ id: boardId });
  }

  async findLastBoardList(count: number, maxId: number, viewerId: number) {
    // limit 혹은 take 적용 필요할 듯..
    const qb = this.boardRepository
      .createQueryBuilder('board')
      .leftJoin('board.photos', 'photo')
      .leftJoin('board.user', 'user')
      .leftJoin('board.likes', 'like')
      .leftJoin('like.user', 'likeUser')
      .select([
        'board',
        'user.id',
        'user.name',
        'user.profileUrl',
        'photo.url',
        'like',
        'likeUser.id',
      ])
      .loadRelationCountAndMap(
        'board.comment',
        'board.comments',
        'commentCount',
      )
      .loadRelationCountAndMap('board.like', 'board.likes', 'likeCount')
      .orderBy('board.createdAt', 'DESC');

    let boards;
    if (maxId !== -1) {
      const lastBoard = await this.boardRepository.findOneBy({ id: maxId });
      boards = await qb
        .andWhere('board.created_at < :created_at', {
          created_at: lastBoard.createdAt,
        })
        .getMany();
    } else {
      boards = await qb.getMany();
    }
    if (boards.length !== 0) {
      boards = boards.slice(0, count);
      boards.forEach((board) => {
        board.isLiked = false;
        board.likes.forEach((like) => {
          if (like.user.id === viewerId) board.isLiked = true;
        });
        delete board.likes;
      });
      const _count = boards.length;
      console.log(boards);
      const nextMaxId = boards[0].id;
      return { boards, count: _count, next_max_id: nextMaxId };
    }
    return { boards: null, count: 0, next_max_id: -1 };
  }

  async findUserById(id: number): Promise<Board> {
    return await this.boardRepository
      .createQueryBuilder('board')
      .select(['board', 'user.id'])
      .leftJoin('board.user', 'user')
      .where('board.id = :id', { id: id })
      .getOne();
  }

  async findLastBoardListByUserId(
    count: number,
    maxId: number,
    userId: number,
  ) {
    // limit 혹은 take 적용 필요할 듯..
    const qb = this.boardRepository
      .createQueryBuilder('board')
      .leftJoin('board.photos', 'photo')
      .leftJoin('board.user', 'user')
      .where('user.id = :id', { id: userId })
      .leftJoin('board.likes', 'like')
      .leftJoin('like.user', 'likeUser', 'likeUser.id')
      .select([
        'board',
        'user.id',
        'user.name',
        'user.profileUrl',
        'photo.url',
        'like',
        'likeUser.id',
      ])
      .loadRelationCountAndMap(
        'board.comment',
        'board.comments',
        'commentCount',
      )
      .loadRelationCountAndMap('board.like', 'board.likes', 'likeCount')
      .orderBy('board.created_at', 'DESC');

    let boards;

    if (maxId !== -1) {
      const lastBoard = await this.boardRepository.findOneBy({ id: maxId });

      boards = await qb
        .andWhere('board.created_at < :created_at', {
          created_at: lastBoard.createdAt,
        })
        .limit(count)
        .getMany();
    } else {
      boards = await qb.limit(count).getMany();
    }

    if (boards.length !== 0) {
      boards = boards.slice(0, count);
      boards.forEach((board) => {
        board.isLiked = false;
        board.likes.forEach((like) => {
          if (like.user.id === userId) board.isLiked = true;
        });
        delete board.likes;
      });
      console.log(boards);
      const _count = boards.length;
      const nextMaxId = boards[0].id;
      return { boards, count: _count, next_max_id: nextMaxId };
    }
    return { boards: null, count: 0, next_max_id: -1 };
  }

  async findWithInRange(
    { leftDown: l, rightTop: r }: GetMapDto,
    viewerId: number,
  ) {
    const polygon = `POLYGON((${l.latitude} ${l.longitude},${l.latitude} ${r.longitude},${r.latitude} ${r.longitude},${r.latitude} ${l.longitude},${l.latitude} ${l.longitude}))`;
    const qb = this.boardRepository
      .createQueryBuilder('board')
      .select([
        'board',
        'user.id',
        'user.name',
        'user.profileUrl',
        'photo.url',
        'like',
        'likeUser.id',
      ])
      .leftJoin('board.photos', 'photo')
      .leftJoin('board.user', 'user')
      .leftJoin('board.likes', 'like')
      .leftJoin('like.user', 'likeUser', 'likeUser.id')
      .loadRelationCountAndMap(
        'board.comment',
        'board.comments',
        'commentCount',
      )
      .loadRelationCountAndMap('board.like', 'board.likes', 'likeCount')
      .where(
        () => `ST_Within(board.coordinate,ST_GeomFromText('${polygon}'))=1`,
      );
    let boards;
    if (true) boards = await qb.getMany();

    if (boards.length !== 0) {
      boards.forEach((board) => {
        board.isLiked = false;
        board.likes.forEach((like) => {
          if (like.user.id === viewerId) board.isLiked = true;
        });
        delete board.likes;
      });
      console.log(boards);
      return { boards };
    }
  }

  async findLikeListByBoardId(boardId: number) {
    const data = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.likes', 'like')
      .leftJoinAndSelect('like.user', 'user')
      .select([
        'user.id as id',
        'user.name as name',
        'user.profileUrl as profileUrl',
      ])
      .where('board_id = :boardId', { boardId: boardId })
      .execute();
    return { users: data };
  }
}
