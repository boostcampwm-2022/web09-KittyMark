import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// util
import { getSocialName, getUrlParms } from '../../utils/loginUtils';
// hook
import useOauthCheck from '../../hooks/usePostAuthInfo';
// component
import LoadingContainer from '../../components/LoadingContainer/LoadingContainer';

const LoadingPage = () => {
  const oauthCheck = useOauthCheck();
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const [authorizationCode, state] = getUrlParms(url);
    if (authorizationCode && state) {
      const socialName = getSocialName(url);
      if (socialName) oauthCheck(socialName, authorizationCode, state);
    } else navigate('/', { replace: true });
  }, []);

  return <LoadingContainer />;
};

export default LoadingPage;
