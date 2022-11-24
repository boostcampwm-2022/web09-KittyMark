import React from 'react';
import styled from 'styled-components';
// img
import logo from '../../static/logo.png';
import appName from '../../static/logoName.png';

const NoramlTopBarContainer = styled.div`
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

const NormalTopBarLogoContainer = styled.div`
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
    <NoramlTopBarContainer>
      <NormalTopBarLogoContainer>
        <img src={logo} alt="Logo" style={{ width: '3rem', height: '3rem' }} />
        <img
          src={appName}
          alt="App Name"
          style={{ width: '10rem', height: '2rem' }}
        />
      </NormalTopBarLogoContainer>
      {buttonData !== null ? (
        <button type="button" onClick={buttonData.eventHandler}>
          <img src={buttonData.buttonImg} alt={buttonData.description} />
        </button>
      ) : null}
    </NoramlTopBarContainer>
  );
};

export default NormalTopBar;
