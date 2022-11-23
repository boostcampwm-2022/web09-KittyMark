import { IsNotEmpty } from 'class-validator';

export class LikeBoardDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  boardId: number;
}
