import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { OauthInfo } from './user.enum';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<Repository<User>>;
  //   let userService: jest.Mocked<UserService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        // {
        //   provide: UserService,
        //   useValue: {
        //     findByOauthInfo: jest.fn(),
        //   },
        // },
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
    // userService = module.get<jest.Mocked<UserService>>(UserService);
  });

  const id = 1;
  const name = 'chae_nuun';
  const email = 'dla0510@naver.com';
  const oauth_info = OauthInfo.NAVER;
  const profile_url = './defaultProfile.svg';

  describe('create', () => {
    it('should create user', async () => {
      // Given
      // register 함수로 registerDto 정보가 들어오면
      // When
      // userRepository를 사용해 DB에 New User 저장
      // Then
      // { code: 200, message: 'Success' } 반환
      repository.findOne.mockResolvedValue(null);
      //   userService.findByOauthInfo.mockResolvedValue(undefined);

      const result = await service.register({
        email,
        imageURL: './defaultProfile.svg',
        userName: 'chae_nuun',
      });

      expect(result).toMatchObject({ code: 200, message: 'Success' });
    });

    it('should throw ConflictException when user already exists', async () => {
      // Given
      // register 함수로 이미 DB에 있는 registerDto 정보가 들어오면
      // When
      // userRepository.save에서 오류 발생
      // Then
      // ConflictException('이미 존재하는 유저입니다') 반환
      repository.findOne.mockResolvedValue({
        id,
        name,
        email,
        oauth_info,
        profile_url,
      });

      await expect(
        service.register({
          email,
          imageURL: './defaultProfile.svg',
          userName: 'chae_nuun',
        }),
      ).rejects.toThrowError(
        new ConflictException('이미 존재하는 유저입니다.'),
      );
    });
  });
});
