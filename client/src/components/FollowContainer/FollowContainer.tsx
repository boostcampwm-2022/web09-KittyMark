import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
// recoil
import user from '../../store/userAtom';
// style
import S from './FollowContainerStyles';
// api
import { getFollow } from '../../apis/api/userApi';
// component
import FollowUnit from '../FollowUnit/FollowUnit';
// type
import { FollowListData } from '../../types/responseData';

interface FollowerContainerProps {
  userId: number;
}

// TODO 리엑트 쿼리 관련 코드를 분할하는 것이 좋을 수 있다.
const FollowContainer = ({ userId }: FollowerContainerProps) => {
  const { userId: viewerId } = useRecoilValue(user);
  const [status, setStatus] = useState<boolean>(true);

  const followList = useQuery<FollowListData, AxiosError>('followList', () =>
    getFollow(Number(userId)).then((res) => res.data),
  );

  const onClickFollowerBtn = () => setStatus(true);
  const onClickFollowingBtn = () => setStatus(false);

  if (followList.isLoading || followList.isIdle) {
    return (
      <S.Body>
        <S.ButtonContainer>
          <S.Button type="button" isOn={status} onClick={onClickFollowerBtn}>
            팔로워
          </S.Button>
          <S.Button type="button" isOn={!status} onClick={onClickFollowingBtn}>
            팔로잉
          </S.Button>
        </S.ButtonContainer>
        <p>Loading...</p>
      </S.Body>
    );
  }

  if (followList.isError) {
    return (
      <S.Body>
        <S.ButtonContainer>
          <S.Button type="button" isOn={status} onClick={onClickFollowerBtn}>
            팔로워
          </S.Button>
          <S.Button type="button" isOn={!status} onClick={onClickFollowingBtn}>
            팔로잉
          </S.Button>
        </S.ButtonContainer>
        <p>
          {axios.isAxiosError(followList.error)
            ? followList.error.message
            : 'error'}
        </p>
      </S.Body>
    );
  }

  return (
    <S.Body>
      <S.ButtonContainer>
        <S.Button type="button" isOn={status} onClick={onClickFollowerBtn}>
          팔로워
        </S.Button>
        <S.Button type="button" isOn={!status} onClick={onClickFollowingBtn}>
          팔로잉
        </S.Button>
      </S.ButtonContainer>
      <S.UnitContainer>
        {status
          ? followList.data.users_follow_user.map((followUser) => (
              <FollowUnit
                key={followUser.id}
                userId={userId}
                targetId={followUser.id}
                userName={followUser.name}
                isFollow={followUser.is_followed_by_viewer}
                isViewer={followUser.id === viewerId}
              />
            ))
          : followList.data.users_followed_by_user.map((followedUser) => (
              <FollowUnit
                key={followedUser.id}
                userId={userId}
                targetId={followedUser.id}
                userName={followedUser.name}
                isFollow={followedUser.is_followed_by_viewer}
                isViewer={followedUser.id === viewerId}
              />
            ))}
      </S.UnitContainer>
    </S.Body>
  );
};

export default FollowContainer;
