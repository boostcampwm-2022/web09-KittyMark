import { IsNotEmpty } from 'class-validator';

export class DeleteCommentDto {
  @IsNotEmpty()
  boardId: number;

  @IsNotEmpty()
  userId: number;
}
