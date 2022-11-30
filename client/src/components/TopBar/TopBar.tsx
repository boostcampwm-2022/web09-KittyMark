/* eslint-disable react/require-default-props */
import React, { MouseEventHandler } from 'react';
// style
import S from './TopBarStyles';
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
    <S.Container>
      {isBack && backFunc ? (
        <S.BackButton type="button" onClick={backFunc}>
          <img src={backBtn} alt="Back" />
        </S.BackButton>
      ) : (
        <div style={{ padding: '0.75rem' }} />
      )}
      <p>{title}</p>
      {isCheck && checkFunc && checkDisableFunc ? (
        <S.CheckButton
          type="button"
          onClick={checkFunc}
          disabled={checkDisableFunc()}
        >
          <img src={checkBtn} alt="Check" />
        </S.CheckButton>
      ) : (
        <div style={{ padding: '0.75rem' }} />
      )}
    </S.Container>
  );
};

export default TopBar;
