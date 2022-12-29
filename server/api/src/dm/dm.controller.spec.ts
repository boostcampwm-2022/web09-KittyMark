import { Test, TestingModule } from '@nestjs/testing';
import { DmController } from './dm.controller';

describe('DmController', () => {
  let controller: DmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DmController],
    }).compile();

    controller = module.get<DmController>(DmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
