import { AxiosResponse } from 'axios';
import defaultInstance from '../utils';
// type
import { LoginApi, Api } from '../../types/responseData';

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
    `/api/oauth/${socialName}`,
    {
      authorizationCode,
      state,
    },
  );
  return data;
};

/**
 * @param email 서버에서 받은 email 정보를 기입한다.
 * @param imageURL 오브젝트 스토리지에 올리고 받은 사진 위치 정보 기입 (변경 예정)
 * @param userName 사용자 입력 닉네임 기입
 * @param oauthInfo NAVER 혹은 KAKAO
 * @returns 서버와의 통신 이후 결과를 보내준다.
 */
// TODO 이미지 url 을 보내는 것이 아닌 form 으로 사진 데이터를 보내야한다.
export const postRegisterInfo = async (
  email: string,
  imageURL: string,
  userName: string,
  oauthInfo: 'NAVER' | 'KAKAO',
) => {
  const { data }: AxiosResponse<Api> = await defaultInstance.post(
    `/api/register`,
    {
      email,
      imageURL,
      userName,
      oauthInfo,
    },
  );
  return data;
};
