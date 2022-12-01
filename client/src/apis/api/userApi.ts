import { AxiosResponse } from 'axios';
import {
  Api,
  FollowListApi,
  UserInfoApi,
  UserPostApi,
} from '../../types/responseData';
import { defaultInstance } from '../utils';
// type

const getUserInfo = async (userId: number): Promise<UserInfoApi> => {
  const { data }: AxiosResponse<UserInfoApi> = await defaultInstance.get(
    `/api/user/profile-info/?userId=${userId}`,
  );
  return data;
};

// TODO count 와 maxId 관련 설정을 뚫어둬야 한다.
const getUserPost = async (userId: number): Promise<UserPostApi> => {
  const { data }: AxiosResponse<UserPostApi> = await defaultInstance.get(
    `/api/board/user/?userId=${userId}&count=10000&maxId=-1`,
  );
  return data;
};

const postFollow = async (
  userId: number,
  followedUserId: number,
): Promise<Api> => {
  const { data }: AxiosResponse<Api> = await defaultInstance.post(
    `/api/user/follow`,
    { userId, followedUserId },
  );
  return data;
};

const deleteFollow = async (
  userId: number,
  followedUserId: number,
): Promise<Api> => {
  const { data }: AxiosResponse<Api> = await defaultInstance.delete(
    `/api/user/follow`,
    {
      data: { userId, followedUserId },
    },
  );
  return data;
};

const getFollow = async (userId: number): Promise<FollowListApi> => {
  const { data }: AxiosResponse<FollowListApi> = await defaultInstance.get(
    `/api/user/follow/${userId}`,
  );
  return data;
};

export { getUserInfo, getUserPost, postFollow, deleteFollow, getFollow };
