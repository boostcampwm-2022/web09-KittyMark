export const onClickNaverLogin = () => {
  const clientId = process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID;
  const stateString = process.env.REACT_APP_NAVER_LOGIN_STATE;
  const callbackUrl = process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL;
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${stateString}&redirect_uri=${callbackUrl}`;
  window.location.assign(naverLoginUrl);
};

export const onClickGithubLogin = () => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
  window.location.assign(githubLoginUrl);
};

export const getSocialName = (url: URL): 'naver' | 'github' | undefined => {
  const callback = url.pathname.split('/')[2];
  if (callback.includes('naver')) return 'naver';
  if (callback.includes('github')) return 'github';
  return undefined;
};

export const getUrlParms = (url: URL) => {
  const authorizationCode = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  return [authorizationCode, state || 'kittymark'];
};
