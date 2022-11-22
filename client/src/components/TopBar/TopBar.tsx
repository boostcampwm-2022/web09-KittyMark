/* eslint-disable react/require-default-props */
import React, { MouseEventHandler } from 'react';
// style
import { TopBarContainer, TopBarButton } from './TopBarStyles';
// img
import backBtn from '../../static/backBtn.svg';
import checkBtn from '../../static/checkBtn.svg';

interface TopBarProps {
  isBack: boolean;
  title: string;
  isCheck: boolean;
  backFunc?: MouseEventHandler<HTMLButtonElement>;
  checkFunc?: MouseEventHandler<HTMLButtonElement>;
}

const TopBar = ({
  isBack,
  title,
  isCheck,
  backFunc,
  checkFunc,
}: TopBarProps) => {
  return (
    <TopBarContainer>
      {isBack && backFunc ? (
        <TopBarButton type="button" onClick={backFunc}>
          <img src={backBtn} alt="Back" />
        </TopBarButton>
      ) : (
        <div style={{ padding: '0.75rem' }} />
      )}
      <p>{title}</p>
      {isCheck && checkFunc ? (
        <TopBarButton type="button" onClick={checkFunc}>
          <img src={checkBtn} alt="Check" />
        </TopBarButton>
      ) : (
        <div style={{ padding: '0.75rem' }} />
      )}
    </TopBarContainer>
  );
};

export default TopBar;
