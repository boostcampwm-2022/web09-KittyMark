import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateLastSeenChatDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  dmRoomId: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsNotEmpty()
  messageId: string;
}
