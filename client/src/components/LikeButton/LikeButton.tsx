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
  setLikeCount: (likeCount: number) => void;
}

const LikeButton = (props: LikeButtonProps) => {
  const { requestId, isLiked, postLikeApi, deleteLikeApi, setLikeCount } =
    props;
  const [liked, setLiked] = useState(isLiked !== undefined ? isLiked : false);
  const { userId } = useRecoilValue(user);

  const { mutateAsync } = useMutation(
    liked
      ? () => deleteLikeApi(requestId, userId)
      : () => postLikeApi(requestId, userId),
    {
      onSuccess: () => {
        setLiked(!liked);
      },
    },
  );

  const onClickLikeButton = async () => {
    const response = await mutateAsync();
    if (response.data) {
      const { likeCount } = response.data;
      setLikeCount(likeCount);
    }
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
