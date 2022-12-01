import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Place {
  @IsNotEmpty()
  readonly latitude: number;
  @IsNotEmpty()
  readonly longitude: number;
}

export class GetMapDto {
  @Type(() => Place)
  @ValidateNested()
  leftDown: Place;

  @Type(() => Place)
  @ValidateNested()
  rightTop: Place;
}
