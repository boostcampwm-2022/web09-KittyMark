import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  validateName(userName: string) {
    if (/[^\w.]/.test(userName))
      throw new BadRequestException(
        '사용자 이름에는 문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
      );
    return;
  }
}
