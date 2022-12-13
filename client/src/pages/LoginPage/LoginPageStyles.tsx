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

const CustomOauthButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  width: 12rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.1rem;

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default { Container, LogoImg, OauthButton, CustomOauthButton };
