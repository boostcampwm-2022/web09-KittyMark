import { Injectable } from '@nestjs/common';
import { CheckNameDto } from './dto/check-name.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async checkName(checkNameDto: CheckNameDto) {
    const { name } = checkNameDto;

    const user = await this.userRepository.findByName(name);
    if (user) {
      return { statusCode: 200, message: 'Success', data: { isExist: true } };
    } else {
      return { statusCode: 200, message: 'Success', data: { isExist: false } };
    }
  }
}
