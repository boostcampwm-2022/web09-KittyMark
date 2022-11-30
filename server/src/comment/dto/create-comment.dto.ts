import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  boardId: number;

  content: string;

  rootCommentId: null | number;
}
