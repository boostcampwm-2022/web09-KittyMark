import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
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

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  dmRoomId: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  count: number;

  @IsNotEmpty()
  maxId: string;
}
