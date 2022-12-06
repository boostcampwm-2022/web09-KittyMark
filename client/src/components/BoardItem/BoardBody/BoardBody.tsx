import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from './BoardBodyStyles';
import commentButton from '../../../static/commentBtn.svg';
import timeCalc from '../../../utils/timeCalc';
import LikeButton from '../../LikeButton/LikeButton';
import { deleteLikeBoard, postLikeBoard } from '../../../apis/api/boardApi';

interface BoardBodyProps {
  boardId: number;
  /* TODO: 좋아요 여부 */
  content: string;
  like: number;
  comment: number;
  createdAt: string;
}

const BoardBody = (props: BoardBodyProps) => {
  const { boardId, content, like, comment, createdAt } = props;
  const navigate = useNavigate();

  const onClickCommentIcon = () => {
    navigate(`/comment/${boardId}`);
  };

  // const onClickHeartIcon = () => {
  //   /* TODO: 이 게시글에 대한 좋아요 요청 */
  // };

  return (
    <S.Wrapper>
      <S.Container>
        <S.ButtonContainer>
          <LikeButton
            requestId={boardId}
            isLiked={false}
            postLikeApi={postLikeBoard}
            deleteLikeApi={deleteLikeBoard}
          />
          {/* <button type="button" onClick={onClickHeartIcon}>
            <img src={emptyHeartButton} alt="이 게시글이 마음에 듭니다." />
          </button> */}
          <button type="button" onClick={onClickCommentIcon}>
            <img
              src={commentButton}
              alt="이 게시글의 댓글을 확인하고 싶습니다."
            />
          </button>
        </S.ButtonContainer>
        <S.ContentContainer>
          <p>{content}</p>
        </S.ContentContainer>
        <S.InfoContainer>
          <div>
            {like > 0 ? <p>좋아요 {like}개</p> : ''}
            {comment > 0 ? <p>댓글 {comment}개</p> : ''}
          </div>
          <p>{timeCalc(createdAt)}</p>
        </S.InfoContainer>
      </S.Container>
    </S.Wrapper>
  );
};

export default BoardBody;
