import { AxiosError, AxiosResponse } from 'axios';
import {
  DirectMessageApi,
  DirectMessageListApi,
} from '../../types/responseData';
import { defaultInstance } from '../utils';

const getDirectMessages = async (
  userId: number,
  otherUserId: number,
): Promise<DirectMessageApi> => {
  const { data }: AxiosResponse<DirectMessageApi, AxiosError> =
    await defaultInstance.get(
      `/api/dm?userId=${userId}&otherUserId=${otherUserId}`,
    );
  return data;
};

const getDirectMessageList = async (
  userId: number,
): Promise<DirectMessageListApi> => {
  const { data }: AxiosResponse<DirectMessageListApi, AxiosError> =
    await defaultInstance.get(`/api/dm?userId=${userId}`);
  return data;
};

export { getDirectMessages, getDirectMessageList };
