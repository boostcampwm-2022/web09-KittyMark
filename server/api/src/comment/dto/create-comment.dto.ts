import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  boardId: number;

  @IsOptional()
  content: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  rootCommentId: number;
}
