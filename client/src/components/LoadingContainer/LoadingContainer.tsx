import React from 'react';
// style
import S from './LoadingContainerStyles';
// img
import loadingCat from '../../static/loadingCat.gif';

const LoadingContainer = () => {
  return (
    <S.Body>
      <img src={loadingCat} alt="로딩중" width="30%" />
      <S.Text>Loading...</S.Text>
    </S.Body>
  );
};

export default LoadingContainer;
