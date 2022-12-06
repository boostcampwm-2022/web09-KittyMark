import { AxiosResponse } from 'axios';
import {
  Api,
  FollowListApi,
  UserInfoApi,
  UserPostApi,
} from '../../types/responseData';
import { defaultInstance, defaultFormInstance } from '../utils';
// type

const getUserInfo = async (
  userId: number,
  viewerId: number,
): Promise<UserInfoApi> => {
  const { data }: AxiosResponse<UserInfoApi> = await defaultInstance.get(
    `/api/user/profile-info/?userId=${userId}&viewerId=${viewerId}`,
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

const getFollow = async (
  userId: number,
  viewerId: number,
): Promise<FollowListApi> => {
  const { data }: AxiosResponse<FollowListApi> = await defaultInstance.get(
    `/api/user/follow/${userId}?viewer=${viewerId}`,
  );
  return data;
};

const patchUserInfo = async (
  userId: number,
  userName: string,
  image: File | null,
): Promise<Api> => {
  const formData = new FormData();
  formData.append('userId', String(userId));
  formData.append('userName', userName);
  formData.append('image', image || '');

  const { data }: AxiosResponse<Api> = await defaultFormInstance.patch(
    `/api/user/info`,
    formData,
  );
  return data;
};

const putUserImage = async (
  userId: number,
  image: File | null,
): Promise<Api> => {
  const formData = new FormData();
  formData.append('userId', String(userId));
  formData.append('image', image || '');

  const { data }: AxiosResponse<Api> = await defaultFormInstance.patch(
    `/api/user/image`,
    formData,
  );
  return data;
};

export {
  getUserInfo,
  getUserPost,
  postFollow,
  deleteFollow,
  getFollow,
  patchUserInfo,
  putUserImage,
};
