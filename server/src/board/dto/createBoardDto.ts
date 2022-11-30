import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  isStreet: boolean;

  location: string | null;

  latitude: number;

  longitude: number;
}
