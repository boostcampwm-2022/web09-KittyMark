import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// api
import { postAuthInfo } from '../../apis/api/loginApi';
// style
import { Background, LoadingText } from './LoadingPageStyles';
// img
import loadingCat from '../../static/loadingCat.gif';

const LoadingPage = () => {
  const navigation = useNavigate();
  const getSocialName = (url: URL): 'naver' | 'kakao' => {
    const callback = url.pathname.split('/')[2];
    let name: 'naver' | 'kakao' = 'kakao';
    if (callback.includes('naver')) name = 'naver';
    return name;
  };

  const postAuthrizationInfo = async (
    socialName: 'naver' | 'kakao',
    authorizationCode: string,
    state: string,
  ) => {
    try {
      const data = await postAuthInfo(socialName, authorizationCode, state);
      if (data.code !== 200) navigation('/');
      else if (data.email)
        navigation('/register', {
          state: { email: data.email, ouathInfo: 'NAVER' },
        });
      else navigation('/home');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    // TODO 만약에 여기서 getSocialName 에 아무것도 없다면 ? (인위적으로 클라이언트가 입력)
    if (authorizationCode && state) {
      const socialName = getSocialName(url);
      postAuthrizationInfo(socialName, authorizationCode, state);
    }
  }, []);

  return (
    <Background>
      <img src={loadingCat} alt="로딩중" width="30%" />
      <LoadingText>Loading...</LoadingText>
    </Background>
  );
};

export default LoadingPage;
