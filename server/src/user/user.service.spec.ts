import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { S3Service } from 'src/S3/S3.service';
import { OauthInfo } from '../auth/model/oauth-info.enum';
import { GetProfileInfoDto } from './dto/get-profile-info.dto';
import { FollowRepository } from './follow/follow.repository';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { when } from 'jest-when';
import { Follow } from './follow/follow.entity';

describe('UserService', () => {
  let userService: UserService;
  const userRepository = {
    findByName: jest.fn(),
    findById: jest.fn(),
    findByOauthInfo: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    findUserSummaryById: jest.fn(),
  };
  const s3Service = {
    uploadFile: jest.fn(),
  };
  const followRepository = {
    save: jest.fn(),
    delete: jest.fn(),
    findFollowingCnt: jest.fn(),
    findFollowerCnt: jest.fn(),
    findFollow: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        { provide: S3Service, useValue: s3Service },
        { provide: FollowRepository, useValue: followRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  const id = 1;
  const name = 'chae_nuun';
  const email = 'dla0510@naver.com';
  const oauthInfo = OauthInfo.NAVER;
  const profileUrl = '';

  const user = plainToInstance(User, {
    id,
    name,
    email,
    oauthInfo,
    profileUrl,
  });

  describe('create User', () => {
    it('should create user', async () => {
      // Given
      const createUserDto = {
        email,
        userName: name,
        oauthInfo,
      };
      userRepository.findByName.mockResolvedValue(null);
      userRepository.findByOauthInfo.mockResolvedValue(null);
      userRepository.save.mockResolvedValue(null);

      //When
      const result = await userService.createUser(null, createUserDto);

      //Then
      expect(result).toMatchObject({
        statusCode: 201,
        message: 'Success',
      });
    });

    it('should throw ConflictException when user already exists', async () => {
      // Given
      const createUserDto = {
        email,
        userName: name,
        oauthInfo,
      };
      userRepository.findByName.mockResolvedValue(null);
      userRepository.findByOauthInfo.mockResolvedValue(user);

      //When
      //Then
      await expect(
        userService.createUser(null, createUserDto),
      ).rejects.toThrowError(
        new ConflictException('이미 존재하는 유저입니다.'),
      );
    });

    it('should throw ConflictException when userName already exists', async () => {
      // Given
      const createUserDto = {
        email,
        userName: name,
        oauthInfo,
      };
      userRepository.findByName.mockResolvedValue(user);

      //When
      //Then
      await expect(
        userService.createUser(null, createUserDto),
      ).rejects.toThrowError(
        new ConflictException('이미 존재하는 이름입니다.'),
      );
    });

    it('should throw BadRequestException when userName consists of characters other than a-z, 0-9, _, .', async () => {
      // Given
      const createUserDto = {
        email,
        userName: 'chae_nuun^^',
        oauthInfo,
      };

      //When
      //Then
      await expect(
        userService.createUser(null, createUserDto),
      ).rejects.toThrowError(
        new BadRequestException(
          '사용자 이름에는 문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
        ),
      );
    });
  });

  describe('get user info', () => {
    const getProfileInfoDto: GetProfileInfoDto = {
      userId: user.id,
      viewerId: 2,
    };

    it('should get information of user', async () => {
      //Given
      when(userRepository.findUserSummaryById)
        .calledWith(getProfileInfoDto.userId)
        .mockResolvedValue({
          user_id: user.id,
          user_name: user.name,
          profile_url: user.profileUrl,
          boardCount: '2',
        });
      when(followRepository.findFollowingCnt)
        .calledWith(getProfileInfoDto.userId)
        .mockResolvedValue([{ count: '1' }]);
      when(followRepository.findFollowerCnt)
        .calledWith(getProfileInfoDto.userId)
        .mockResolvedValue([{ count: '2' }]);

      const viewer = plainToInstance(User, {
        id: 2,
        name: 'yooji',
        email: 'yooji0415@naver.com',
        oauthInfo: 'NAVER',
        profileUrl: '',
      });

      const follow = plainToInstance(Follow, {
        user: viewer,
        followedUser: user,
      });
      const follower = plainToInstance(Follow, {
        user,
        followedUser: viewer,
      });
      when(followRepository.findFollow)
        .calledWith(getProfileInfoDto.viewerId, getProfileInfoDto.userId)
        .mockResolvedValue(follow);
      when(followRepository.findFollow)
        .calledWith(getProfileInfoDto.userId, getProfileInfoDto.viewerId)
        .mockResolvedValue(follower);

      //When
      //Then
      const result = await userService.getUserInfo(getProfileInfoDto);
      expect(result).toMatchObject({
        userId: 1,
        userName: 'chae_nuun',
        userProfileUrl: '',
        boards: {
          count: '2',
        },
        follow: {
          count: '1',
        },
        followed_by: {
          count: '2',
        },
        followed_by_viewer: true,
        follows_viewer: true,
      });
    });
  });
});
