/* eslint-disable react/require-default-props */
import React from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
// style
import {
  CommentUnitWrap,
  CommentInfoContainer,
  CommentContent,
  CommentMenuBtn,
} from './CommentUnitStyles';
// img
import menuBtn from '../../static/menuBtn.svg';

interface CommentUnitProps {
  userName: string;
  createdAt: string;
  content: string;
  userProfile?: string;
}

// 단순하게 일단 표시용을 만들었다.
// TODO 추후 답글 기능을 만든다면 commentId 를 props 로 받아오고 따로 버튼을 만들어야 한다.
const CommentUnit = ({
  userName,
  createdAt,
  content,
  userProfile = '../../defaultProfile.svg',
}: CommentUnitProps) => {
  return (
    <CommentUnitWrap>
      <CommentInfoContainer>
        <ProfileIcon userName={userName} userProfile={userProfile} />
        <p className="user-name">{userName}</p>
        <p className="createdAt">{createdAt}</p>
      </CommentInfoContainer>
      <CommentContent>{content}</CommentContent>
      <CommentMenuBtn type="button">
        <img src={menuBtn} alt="Menu" />
      </CommentMenuBtn>
    </CommentUnitWrap>
  );
};

export default CommentUnit;
