import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.providers';

describe('User', () => {
  let provider: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [User],
    }).compile();

    provider = module.get<User>(User);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
