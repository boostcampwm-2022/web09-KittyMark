import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class FollowDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  followedUserId: number;
}
