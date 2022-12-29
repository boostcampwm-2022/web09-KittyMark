import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetMessageDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  otherUserId: number;
}
