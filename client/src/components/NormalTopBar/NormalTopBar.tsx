import React from 'react';
import styled from 'styled-components';
// img
import logo from '../../static/newLogoName.png';
// preload
import { NewPostPage } from '../../pages';

const Container = styled.div`
  position: sticky;
  top: 0px;
  left: 0px;
  z-index: 5;
  width: calc(100% - 24px);
  height: calc(4rem - 18px);
  background-color: ${(props) => props.theme.palette.main};
  display: flex;
  flex-direction: row;
  padding: 9px 12px;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 0px;
    display: flex;
    align-items: center;
    margin-right: 0.4rem;
    background-color: transparent;
    border: 0px;
  }
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
      <img src={logo} alt="App Name" style={{ width: '13rem' }} />
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
