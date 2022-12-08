import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.palette.main};
`;

const LogoImg = styled.img`
  width: 22rem;
  margin-bottom: 2rem;
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

export default { Container, LogoImg, OauthButton };
