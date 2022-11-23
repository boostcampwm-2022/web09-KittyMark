/* eslint-disable react/require-default-props */
import React, { MouseEventHandler } from 'react';
// style
import {
  TopBarContainer,
  TopBarBackButton,
  TopBarCheckButton,
} from './TopBarStyles';
// img
import backBtn from '../../static/backBtn.svg';
import checkBtn from '../../static/checkBtn.svg';

interface TopBarProps {
  isBack: boolean;
  title: string;
  isCheck: boolean;
  backFunc?: MouseEventHandler<HTMLButtonElement>;
  checkFunc?: MouseEventHandler<HTMLButtonElement>;
  checkDisableFunc?: () => boolean;
}

const TopBar = ({
  isBack,
  title,
  isCheck,
  backFunc,
  checkFunc,
  checkDisableFunc,
}: TopBarProps) => {
  return (
    <TopBarContainer>
      {isBack && backFunc ? (
        <TopBarBackButton type="button" onClick={backFunc}>
          <img src={backBtn} alt="Back" />
        </TopBarBackButton>
      ) : (
        <div style={{ padding: '0.75rem' }} />
      )}
      <p>{title}</p>
      {isCheck && checkFunc && checkDisableFunc ? (
        <TopBarCheckButton
          type="button"
          onClick={checkFunc}
          disabled={checkDisableFunc()}
        >
          <img src={checkBtn} alt="Check" />
        </TopBarCheckButton>
      ) : (
        <div style={{ padding: '0.75rem' }} />
      )}
    </TopBarContainer>
  );
};

export default TopBar;
