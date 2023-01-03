import { Transform } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class DeleteBoardDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  boardId: number;
}
