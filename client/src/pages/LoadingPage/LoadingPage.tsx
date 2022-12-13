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
import { LoginApi, RedirectApi } from '../../types/responseData';

const LoadingPage = () => {
  const navigate = useNavigate();
  const setUserData = useSetRecoilState(user);

  const postAuthrizationInfo = useCallback(
    async (
      socialName: 'naver' | 'github',
      authorizationCode: string,
      state: string,
    ) => {
      let data: LoginApi | RedirectApi;
      try {
        data = await postAuthInfo(socialName, authorizationCode, state);
        if (data.statusCode === 200) {
          // 로그인 성공인 경우를 처리한다.
          data = data as LoginApi;
          setUserData({
            userId: data.data.userId,
            userName: data.data.userName,
            userProfileUrl: data.data.userProfileUrl,
          });
          navigate('/home', { replace: true });
          return;
        }
        // 그 외의 경우를 처리한다.
        navigate('/', { replace: true });
      } catch (error) {
        // eslint-disable-next-line no-console
        if (error instanceof AxiosError) {
          if (error.response?.status === 300) {
            // alert(
            //   '회원 가입되지 않은 회원입니다. 회원 가입 화면으로 이동합니다.',
            // );
            // 회원 가입인 경우를 처리한다.
            data = error.response?.data as RedirectApi;
            navigate('/register', {
              state: { email: data.data.email, oauthInfo: data.data.oauthInfo },
              replace: true,
            });
            return;
          }
          console.log(error);
        }
        navigate('/', { replace: true });
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
      else navigate('/', { replace: true });
    }
  }, []);

  return <LoadingContainer />;
};

export default LoadingPage;
