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
  justify-items: start;
  align-items: center;
  gap: 1rem;
`;

const NormalTopBar = () => {
  return (
    <NoramlTopBarContainer>
      <img src={logo} alt="Logo" style={{ width: '3rem', height: '3rem' }} />
      <img
        src={appName}
        alt="App Name"
        style={{ width: '10rem', height: '2rem' }}
      />
    </NoramlTopBarContainer>
  );
};

export default NormalTopBar;
