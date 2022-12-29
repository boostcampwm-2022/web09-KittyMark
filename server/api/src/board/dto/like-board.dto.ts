import { IsNotEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class LikeBoardDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  boardId: number;
}
