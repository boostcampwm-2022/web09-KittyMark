import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
// recoil
import user from '../../store/userAtom';
// api
import { postAuthInfo } from '../../apis/api/loginApi';
// img
import { LoginApi } from '../../types/responseData';
// component
import LoadingContainer from '../../components/LoadingContainer/LoadingContainer';

const getSocialName = (url: URL): 'naver' | 'kakao' | undefined => {
  const callback = url.pathname.split('/')[2];
  if (callback.includes('naver')) return 'naver';
  if (callback.includes('kakao')) return 'kakao';
  return undefined;
};

const LoadingPage = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const setUserData = useSetRecoilState(user);

  const postAuthrizationInfo = async (
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
        setUserData({ userId: data.data.userId, userName: data.data.userName });
        navigation('/home');
        return;
      }
      // 그 외의 경우를 처리한다.
      navigation('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    console.log(location.pathname);
    console.log(new URLSearchParams(location.search).get('code'));
    const authorizationCode = url.searchParams.get('code');
    const state = url.searchParams.get('state');
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
