import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/user.entity';
import { AuthService } from '../auth/auth.service';
import { OauthInfo } from './model/oauth-info.enum';
import { UserRepository } from '../user/user.repository';
import { plainToInstance } from 'class-transformer';
import { HttpService } from '@nestjs/axios';

describe('AuthService', () => {
  let authService: AuthService;
  const userRepository = {
    findByName: jest.fn(),
    findByOauthInfo: jest.fn(),
    save: jest.fn(),
  };
  const httpService = {
    request: jest.fn(),
  };
  const redisClient = {
    set: jest.fn(),
    expire: jest.fn(),
    get: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        { provide: HttpService, useValue: httpService },
        { provide: 'REDIS_CLIENT', useValue: redisClient },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  const id = 1;
  const name = 'chae_nuun';
  const email = 'dla0510@naver.com';
  const oauthInfo = OauthInfo.NAVER;
  const profileUrl = './defaultProfile.svg';

  describe('createUser', () => {
    const registerUserDto = {
      email,
      userName: name,
      oauthInfo,
    };

    it('should create user', async () => {
      // Given
      utilsSerive.validateName.mockReturnValue(null);
      userRepository.findByName.mockResolvedValue(null);
      userRepository.findByOauthInfo.mockResolvedValue(null);
      userRepository.save.mockResolvedValue(null);

      //When
      const result = await authService.register(null, registerUserDto);

      //Then
      expect(result).toMatchObject({ statusCode: 201, message: 'Success' });
    });

    it('should throw ConflictException when user already exists', async () => {
      // Given
      const user = plainToInstance(User, {
        id,
        name,
        email,
        oauthInfo,
        profileUrl,
      });
      utilsSerive.validateName.mockReturnValue(null);
      userRepository.findByName.mockResolvedValue(null);
      userRepository.findByOauthInfo.mockResolvedValue(user);

      //When
      //Then
      await expect(
        authService.register(null, registerUserDto),
      ).rejects.toThrowError(
        new ConflictException('이미 존재하는 유저입니다.'),
      );
    });

    it('should throw ConflictException when userName already exists', async () => {
      // Given
      const user = plainToInstance(User, {
        id,
        name,
        email,
        oauthInfo,
        profileUrl,
      });
      utilsSerive.validateName.mockReturnValue(null);
      userRepository.findByName.mockResolvedValue(user);

      //When
      //Then
      await expect(
        authService.register(null, registerUserDto),
      ).rejects.toThrowError(
        new ConflictException('이미 존재하는 이름입니다.'),
      );
    });
  });
});
