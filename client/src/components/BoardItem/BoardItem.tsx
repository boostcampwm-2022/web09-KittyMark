import React from 'react';
// type
import { Board } from '../../types/responseData';
// style
import BoardBody from './BoardBody/BoardBody';
import BoardHeader from './BoardHeader/BoardHeader';
import BoardBackground from './BoardItemStyles';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

const convertPhotosToUrls = (photos: { url: string }[]) => {
  const urls = photos.map((photo) => {
    return photo.url;
  });
  return urls;
};

const BoardItem = (props: Board) => {
  if (props === undefined || props === null) return null;

  const {
    id,
    content,
    isStreet,
    isLiked,
    like,
    comment,
    createdAt,
    location,
    photos,
    user,
  } = props;
  return (
    <BoardBackground key={id}>
      <BoardHeader
        userId={user.id}
        boardId={id}
        userProfile={user.profileUrl || '../../defaultProfile.svg'}
        userName={user.name}
        isStreet={isStreet}
        location={location}
        content={content}
      />
      <ImageCarousel imageUrls={convertPhotosToUrls(photos)} />
      <BoardBody
        boardId={id}
        content={content}
        isLiked={isLiked}
        like={like}
        comment={comment}
        createdAt={createdAt}
      />
    </BoardBackground>
  );
};

export default BoardItem;
