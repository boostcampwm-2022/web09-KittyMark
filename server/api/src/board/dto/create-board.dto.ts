import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isStreet: boolean;

  @IsOptional()
  location: string;

  @IsOptional()
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @IsOptional()
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  longitude: number;
}
