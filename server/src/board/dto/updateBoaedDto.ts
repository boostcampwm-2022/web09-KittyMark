import { IsNotEmpty } from 'class-validator';

export class UpdateBoardDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  boardId: number;

  @IsNotEmpty()
  content: string;
}
