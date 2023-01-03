import { IsNotEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateBoardDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  boardId: number;

  @IsNotEmpty()
  content: string;
}
