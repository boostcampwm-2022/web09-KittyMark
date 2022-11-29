import { IsNotEmpty } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  boardId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  content: string;
}
