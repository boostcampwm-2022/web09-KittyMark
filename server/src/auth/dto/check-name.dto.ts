import { IsNotEmpty } from 'class-validator';

export class CheckNameDto {
  @IsNotEmpty()
  name: string;
}
