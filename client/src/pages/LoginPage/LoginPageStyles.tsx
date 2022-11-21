import styled from 'styled-components';

const LoginPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${(props) => props.theme.palette.main};
`;

const OauthButton = styled.button`
  background-color: transparent;
  border: none;
  width: 12.5rem;
  height: 3.5rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

export { LoginPageContainer, OauthButton };
