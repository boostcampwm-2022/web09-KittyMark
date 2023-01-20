import { IsNotEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetCommentsDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  board_id: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  count: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  max_id: number;
}
