import React from 'react';
import styled from 'styled-components';
// img
import logo from '../../static/whiteLogo.png';
import appName from '../../static/logoName.png';
// preload
import { NewPostPage } from '../../pages';

const Container = styled.div`
  width: calc(100% - 24px);
  height: calc(4rem - 18px);
  background-color: ${(props) => props.theme.palette.main};
  display: flex;
  flex-direction: row;
  padding: 9px 12px;
  align-items: center;
  justify-content: space-between;

  button {
    background-color: transparent;
    border: 0px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-items: start;
  align-items: center;
  gap: 1rem;
`;

interface NormalTopBarProps {
  buttonData: {
    buttonImg: string;
    eventHandler: () => void;
    description: string;
  } | null;
}

const NormalTopBar = (props: NormalTopBarProps) => {
  const { buttonData } = props;
  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="Logo" style={{ width: '3rem', height: '3rem' }} />
        <img
          src={appName}
          alt="App Name"
          style={{ width: '10rem', height: '2rem' }}
        />
      </LogoContainer>
      {buttonData !== null ? (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <button
          type="button"
          onClick={buttonData.eventHandler}
          onMouseOver={() => NewPostPage.preload()}
        >
          <img src={buttonData.buttonImg} alt={buttonData.description} />
        </button>
      ) : null}
    </Container>
  );
};

export default NormalTopBar;
