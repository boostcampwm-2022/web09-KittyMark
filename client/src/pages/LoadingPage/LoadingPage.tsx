import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
// type
import { AxiosError } from 'axios';
// recoil
import user from '../../store/userAtom';
// util
import { getSocialName, getUrlParms } from '../../utils/loginUtils';
// api
import { postAuthInfo } from '../../apis/api/loginApi';
// component
import LoadingContainer from '../../components/LoadingContainer/LoadingContainer';
// img
import { LoginApi } from '../../types/responseData';

const LoadingPage = () => {
  const navigation = useNavigate();
  const setUserData = useSetRecoilState(user);

  const postAuthrizationInfo = useCallback(
    async (
      socialName: 'naver' | 'kakao',
      authorizationCode: string,
      state: string,
    ) => {
      let data: LoginApi;
      try {
        data = await postAuthInfo(socialName, authorizationCode, state);
        // 서버 에러인 경우를 먼저 처리한다.
        if (data.statusCode !== 200) {
          navigation('/');
          return;
        }
        // 회원 가입인 경우를 처리한다.
        if (data.redirect) {
          navigation('/register', {
            state: { email: data.email, oauthInfo: 'NAVER' },
          });
          return;
        }
        // 로그인 성공인 경우를 처리한다.
        if (data.data) {
          setUserData({
            userId: data.data.userId,
            userName: data.data.userName,
          });
          navigation('/home');
          return;
        }
        // 그 외의 경우를 처리한다.
        navigation('/');
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error instanceof AxiosError) console.log(error.message);
      }
    },
    [],
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const [authorizationCode, state] = getUrlParms(url);
    if (authorizationCode && state) {
      const socialName = getSocialName(url);
      if (socialName)
        postAuthrizationInfo(socialName, authorizationCode, state);
      else navigation('/');
    }
  }, []);

  return <LoadingContainer />;
};

export default LoadingPage;
