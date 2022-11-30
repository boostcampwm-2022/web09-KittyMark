import { AxiosResponse } from 'axios';
import { UserInfoApi, UserPostApi } from '../../types/responseData';
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

export { getUserInfo, getUserPost };
