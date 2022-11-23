import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  image: string[];

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  isStreet: boolean;

  location: string | null;

  latitude: number | null;

  longitude: number | null;
}
