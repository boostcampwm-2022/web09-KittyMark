import { IsNotEmpty } from 'class-validator';

export class DeleteBoardDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  boardId: number;
}
