import { int } from 'aws-sdk/clients/datapipeline';
import { IsNotEmpty } from 'class-validator';

export class GetCommentsDto {
  @IsNotEmpty()
  board_id: number;

  @IsNotEmpty()
  count: number;

  @IsNotEmpty()
  max_id: int;
}
