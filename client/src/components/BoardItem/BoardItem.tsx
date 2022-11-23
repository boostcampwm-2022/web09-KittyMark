import React from 'react';
import { Board } from '../../types/responseData';
import BoardBody from './BoardBody/BoardBody';
import BoardHeader from './BoardHeader/BoardHeader';
import BoardImages from './BoardImages/BoardImages';
import BoardBackground from './BoardItemStyles';

const BoardItem = (props: Board) => {
  const {
    userId,
    userName,
    userProfile,
    boardId,
    content,
    url,
    like,
    comment,
    createAt,
    location,
  } = props;
  return (
    <BoardBackground key={boardId}>
      <BoardHeader
        userId={userId}
        boardId={boardId}
        userProfile={userProfile}
        userName={userName}
        location={location}
      />
      <BoardImages src={url[0]} />
      <BoardBody
        content={content}
        like={like}
        comment={comment}
        createAt={createAt}
      />
    </BoardBackground>
  );
};

export default BoardItem;
