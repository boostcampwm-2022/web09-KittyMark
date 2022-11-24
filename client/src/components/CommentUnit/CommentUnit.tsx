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
// component
import MenuModal from '../MenuModal/MenuModal';

interface CommentUnitProps {
  userName: string;
  commentId: number;
  createdAt: string;
  content: string;
  userProfile: string;
  isModal: boolean;
  setModal: React.Dispatch<React.SetStateAction<number>>;
}

// 단순하게 일단 표시용을 만들었다.
// TODO 추후 답글 기능을 만든다면 commentId 를 props 로 받아오고 따로 버튼을 만들어야 한다.
const CommentUnit = ({
  userName,
  commentId,
  createdAt,
  content,
  userProfile,
  isModal,
  setModal,
}: CommentUnitProps) => {
  const onClickCommentMenuBtn = () => {
    setModal((prev) => {
      if (prev === commentId) return -1;
      return commentId;
    });
  };

  return (
    <CommentUnitWrap>
      <CommentInfoContainer>
        <ProfileIcon userName={userName} userProfile={userProfile} />
        <p className="user-name">{userName}</p>
        <p className="createdAt">{createdAt}</p>
      </CommentInfoContainer>
      <CommentContent>{content}</CommentContent>
      <CommentMenuBtn type="button" onClick={onClickCommentMenuBtn}>
        <img src={menuBtn} alt="Menu" />
      </CommentMenuBtn>
      {isModal && (
        <MenuModal top={70} left={70} onClickCancel={() => setModal(-1)} />
      )}
    </CommentUnitWrap>
  );
};

export default CommentUnit;
