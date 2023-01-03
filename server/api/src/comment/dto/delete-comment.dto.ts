import { IsNotEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteCommentDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  boardId: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;
}
