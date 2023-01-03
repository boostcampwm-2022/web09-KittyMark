import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsNotEmpty()
  content: string;
}
