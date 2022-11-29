import { IsNotEmpty } from 'class-validator';

export class GetProfileInfoDto {
  @IsNotEmpty()
  userId: number;
}
