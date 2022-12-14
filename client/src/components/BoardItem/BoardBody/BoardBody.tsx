import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// util
import timeCalc from '../../../utils/timeCalc';
// api
import { deleteLikeBoard, postLikeBoard } from '../../../apis/api/boardApi';
// style
import S from './BoardBodyStyles';
// component
import LikeButton from '../../LikeButton/LikeButton';
// img
import commentButton from '../../../static/commentBtn.svg';

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

  const viewCommentInfo = (count: number) => {
    return `댓글 ${count}개 ${count <= 1 ? '' : '모두'} 보기`;
  };

  const createDescription = (str: string) => {
    let keyCount = 0;
    const splitContent = str.split('\n');

    if (splitContent.length === 1) return <div>{splitContent}</div>;

    const returnTags = splitContent.map((desc) => {
      keyCount += 1;
      if (desc === '\r') return <br key={keyCount} />;
      return <div key={keyCount}>{desc}</div>;
    });
    return returnTags;
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.ButtonContainer>
          <LikeButton
            requestId={boardId}
            isLiked={isLiked}
            postLikeApi={postLikeBoard}
            deleteLikeApi={deleteLikeBoard}
            setLikeCount={setLikeCount}
          />
          <button type="button" onClick={onClickCommentIcon}>
            <img src={commentButton} alt="view comments" />
          </button>
        </S.ButtonContainer>
        {likeCount > 0 ? (
          <S.LikeCountContainer>
            <div>좋아요 {likeCount}개</div>
          </S.LikeCountContainer>
        ) : (
          ''
        )}
        <S.ContentContainer>
          <span className="board-description">
            {createDescription(content)}
          </span>
        </S.ContentContainer>
        <S.InfoContainer>
          <div>
            {comment > 0 ? (
              <button
                type="button"
                onClick={() => navigate(`/comment/${boardId}`)}
              >
                <span className="comment-info">{viewCommentInfo(comment)}</span>
              </button>
            ) : (
              ''
            )}
          </div>
          <div>
            <span className="create-time-info">{timeCalc(createdAt)}</span>
          </div>
        </S.InfoContainer>
      </S.Container>
    </S.Wrapper>
  );
};

export default BoardBody;
