import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
// recoil
import user from '../../store/userAtom';
// api
import { postAuthInfo } from '../../apis/api/loginApi';
// style
import S from './LoadingPageStyles';
// img
import loadingCat from '../../static/loadingCat.gif';
import { LoginApi } from '../../types/responseData';

const getSocialName = (url: URL): 'naver' | 'kakao' | undefined => {
  const callback = url.pathname.split('/')[2];
  if (callback.includes('naver')) return 'naver';
  if (callback.includes('kakao')) return 'kakao';
  return undefined;
};

const LoadingPage = () => {
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
    const authorizationCode = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    if (authorizationCode && state) {
      const socialName = getSocialName(url);
      if (socialName)
        postAuthrizationInfo(socialName, authorizationCode, state);
      else navigation('/');
    }
  }, []);

  return (
    <S.Body>
      <img src={loadingCat} alt="로딩중" width="30%" />
      <S.Text>Loading...</S.Text>
    </S.Body>
  );
};

export default LoadingPage;
