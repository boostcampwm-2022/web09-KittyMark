import { AxiosResponse } from 'axios';
import { defaultInstance, defaultFormInstance } from '../utils';
// type
import { LoginApi, Api, NameCheckApi } from '../../types/responseData';

export const postAuthInfo = async (
  socialName: 'naver' | 'kakao',
  authorizationCode: string,
  state: string,
): Promise<LoginApi> => {
  const { data }: AxiosResponse<LoginApi> = await defaultInstance.post(
    `/api/auth/oauth/${socialName}`,
    {
      authorizationCode,
      state,
    },
  );
  return data;
};

export const postRegisterInfo = async (
  email: string,
  userName: string,
  oauthInfo: 'NAVER' | 'KAKAO',
  image: File | null,
): Promise<Api> => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('userName', userName);
  formData.append('oauthInfo', oauthInfo);
  formData.append('image', image || '');

  const { data }: AxiosResponse<Api> = await defaultFormInstance.post(
    `/api/auth/register`,
    formData,
  );
  return data;
};

export const postNameCheck = async (name: string): Promise<NameCheckApi> => {
  const { data }: AxiosResponse<NameCheckApi> = await defaultInstance.post(
    `/api/auth/namecheck`,
    { name },
  );
  return data;
};

export const validate = async (): Promise<Api> => {
  const { data }: AxiosResponse<Api> = await defaultInstance.get(
    `/api/auth/validate`,
  );
  return data;
};
