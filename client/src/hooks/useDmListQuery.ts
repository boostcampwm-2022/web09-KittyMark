import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getDirectMessageList } from '../apis/api/dmApi';
import { DmRoom, Api } from '../types/responseData';
import useUnauthCheck from './useUnauthor';

const useDmListQuery = (userId: number) => {
  const unauthCheck = useUnauthCheck();

  const dmList = useQuery<DmRoom[], AxiosError<Api>>(
    ['dmList', userId],
    () => getDirectMessageList(userId).then((res) => res.data.dmRooms),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
      onError: (error) => unauthCheck(error),
    },
  );

  return dmList;
};

export default useDmListQuery;
