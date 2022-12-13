import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ValidateNameDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  name: string;
}
