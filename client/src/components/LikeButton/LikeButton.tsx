import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
// recoil
import user from '../../store/userAtom';
// type
import { LikeApi } from '../../types/responseData';
// img
import emptyHeartButton from '../../static/emptyHeart.svg';
import filledHeardButton from '../../static/filledHeart.svg';

interface LikeButtonProps {
  requestId: number;
  isLiked: boolean;
  postLikeApi: (id: number, userId: number) => Promise<LikeApi>;
  deleteLikeApi: (id: number, userId: number) => Promise<LikeApi>;
}

const LikeButton = (props: LikeButtonProps) => {
  const { requestId, isLiked, postLikeApi, deleteLikeApi } = props;
  const [liked, setLiked] = useState(isLiked);
  const { userId } = useRecoilValue(user);

  const { mutate } = useMutation(
    liked
      ? () => deleteLikeApi(requestId, userId)
      : () => postLikeApi(requestId, userId),
    {
      onSuccess: () => {
        setLiked(!liked);
      },
    },
  );

  // const { data, mutate } = liked
  //   ? useMutation(() => deleteLikeApi(requestId, userId), {})
  //   : useMutation(() => postLikeApi(requestId, userId));

  const onClickLikeButton = () => {
    mutate();
  };

  return (
    <button type="button" onClick={onClickLikeButton}>
      <img
        src={liked ? filledHeardButton : emptyHeartButton}
        alt={liked ? 'cancel the like' : 'like this item'}
      />
    </button>
  );
};

export default LikeButton;
