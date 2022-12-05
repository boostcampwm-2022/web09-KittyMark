import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
// recoil
import user from '../../store/userAtom';
// api
import { deleteCommentInfo } from '../../apis/api/commentApi';
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
import ProfileIcon from '../ProfileIcon/ProfileIcon';

interface CommentUnitProps {
  targetId: number;
  userName: string;
  boardId: number;
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
  targetId,
  userName,
  boardId,
  commentId,
  createdAt,
  content,
  userProfile,
  isModal,
  setModal,
}: CommentUnitProps) => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { userId } = useRecoilValue(user);

  const onClickCommentMenuBtn = () => {
    setModal((prev) => {
      if (prev === commentId) return -1;
      return commentId;
    });
  };

  const onClickModify = async () => {
    navigation('/modify', {
      state: {
        title: '댓글 수정',
        before: content,
        apiType: 'comment',
        apiData: {
          commentId,
          userId,
        },
      },
    });
  };

  const onClickDelete = async () => {
    try {
      const data = await deleteCommentInfo(commentId, userId, boardId);
      if (data.statusCode === 200) {
        setModal(-1);
        queryClient.invalidateQueries('comments');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <CommentUnitWrap>
      <CommentInfoContainer>
        <ProfileIcon
          targetId={targetId}
          userName={userName}
          userProfile={userProfile}
        />
        <p className="user-name">{userName}</p>
        <p className="createdAt">{createdAt}</p>
      </CommentInfoContainer>
      <CommentContent>{content}</CommentContent>
      {targetId === userId && (
        <CommentMenuBtn type="button" onClick={onClickCommentMenuBtn}>
          <img src={menuBtn} alt="Menu" />
        </CommentMenuBtn>
      )}
      {isModal && (
        <MenuModal
          top={70}
          left={70}
          onClickCancel={() => setModal(-1)}
          onClickModify={onClickModify}
          onClickDelete={onClickDelete}
        />
      )}
    </CommentUnitWrap>
  );
};

export default CommentUnit;
