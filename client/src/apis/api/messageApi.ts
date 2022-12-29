import { AxiosResponse } from 'axios';
import { Api } from '../../types/responseData';
import { defaultInstance } from '../utils';

/* 수정중 */
const getDirectMessages = async (
  userName: string,
  senderName: string,
): Promise<Api> => {
  const { data }: AxiosResponse<Api> = await defaultInstance.get(
    `/api/messages?userName=${userName}&senderName=${senderName}`,
  );
  return data;
};

export default getDirectMessages;
