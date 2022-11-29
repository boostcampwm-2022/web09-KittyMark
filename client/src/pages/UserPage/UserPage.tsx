import React from 'react';
// style
import S from './UserPageStyles';
// component
import TopBar from '../../components/TopBar/TopBar';
import NavBar from '../../components/NavBar/NavBar';
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon';

const UserPage = () => {
  return (
    <>
      <TopBar isBack={false} title="Test User" isCheck={false} />
      <S.Body>
        <S.OuterContainer>
          <ProfileIcon
            userName="Test"
            userProfile="../../defaultProfile.svg"
            customLength={4}
          />
          <S.InnerContainerWrap>
            <S.Name>Test User</S.Name>
            <S.InnerContainer>
              <S.CountSlot>
                <p>11</p>
                <p>게시물</p>
              </S.CountSlot>
              <S.CountSlot>
                <p>13</p>
                <p>게시물</p>
              </S.CountSlot>
              <S.CountSlot>
                <p>15</p>
                <p>게시물</p>
              </S.CountSlot>
            </S.InnerContainer>
          </S.InnerContainerWrap>
        </S.OuterContainer>
        <S.ButtonContainer>
          <S.FollowButton type="button" isFollow={false}>
            팔로우
          </S.FollowButton>
          <S.DMButton type="button">메시지</S.DMButton>
        </S.ButtonContainer>
        <S.Grid>
          {[...new Array(20)].map(() => (
            <S.GridSlot type="button" />
          ))}
        </S.Grid>
      </S.Body>
      <NavBar />
    </>
  );
};

export default UserPage;
