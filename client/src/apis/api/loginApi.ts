import { AxiosResponse } from 'axios';
import { defaultInstance, defaultFormInstance } from '../utils';
// type
import { LoginApi, Api, NameCheckApi } from '../../types/responseData';

/**
 * @param socialName 카카오나 네이버 사이트이름을 기입해준다.
 * @param authorizationCode Oauth 사이트에서 리턴해준 코드를 기입해준다.
 * @param state Oauth 사이트에서 리턴해준 state를 기입해준다.
 * @returns 서버와의 통신 이후 결과를 보내준다.
 */
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

/**
 * @param email 서버에서 받은 email 정보를 기입한다.
 * @param image 사용자 입력 이미지 기입
 * @param userName 사용자 입력 닉네임 기입
 * @param oauthInfo NAVER 혹은 KAKAO
 * @returns 서버와의 통신 이후 결과를 보내준다.
 */
export const postRegisterInfo = async (
  email: string,
  userName: string,
  oauthInfo: 'NAVER' | 'KAKAO',
  image: File | null,
): Promise<Api> => {
  const formData = new FormData();
  // TODO key 이름이 바뀔 수 있음
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
