import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BoardBodyWrapper,
  BoardBodyContainer,
  BoardBodyButtonContainer,
  BoardBodyContentContainer,
  BoardBodyInfoContainer,
} from './BoardBodyStyles';
import commentButton from '../../../static/commentBtn.svg';
import timeCalc from '../../../utils/timeCalc';
import LikeButton from '../../LikeButton/LikeButton';
import { deleteLikeBoard, postLikeBoard } from '../../../apis/api/boardApi';

interface BoardBodyProps {
  boardId: number;
  isLiked: boolean;
  content: string;
  like: number;
  comment: number;
  createdAt: string;
}

const BoardBody = (props: BoardBodyProps) => {
  const { boardId, isLiked, content, like, comment, createdAt } = props;
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(like);

  const onClickCommentIcon = () => {
    navigate(`/comment/${boardId}`);
  };

  return (
    <BoardBodyWrapper>
      <BoardBodyContainer>
        <BoardBodyButtonContainer>
          <LikeButton
            requestId={boardId}
            isLiked={isLiked}
            postLikeApi={postLikeBoard}
            deleteLikeApi={deleteLikeBoard}
            setLikeCount={setLikeCount}
          />
          <button type="button" onClick={onClickCommentIcon}>
            <img
              src={commentButton}
              alt="이 게시글의 댓글을 확인하고 싶습니다."
            />
          </button>
        </BoardBodyButtonContainer>
        <BoardBodyContentContainer>
          <p>{content}</p>
        </BoardBodyContentContainer>
        <BoardBodyInfoContainer>
          <div>
            {likeCount > 0 ? <p>좋아요 {likeCount}개</p> : ''}
            {comment > 0 ? <p>댓글 {comment}개</p> : ''}
          </div>
          <p>{timeCalc(createdAt)}</p>
        </BoardBodyInfoContainer>
      </BoardBodyContainer>
    </BoardBodyWrapper>
  );
};

export default BoardBody;
