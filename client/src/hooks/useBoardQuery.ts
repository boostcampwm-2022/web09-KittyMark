import { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { getBoardData } from '../apis/api/boardApi';
import { Api, Board } from '../types/responseData';
import useUnauthCheck from './useUnauthor';

const useBoardQuery = () => {
  const unauthCheck = useUnauthCheck();

  const fetchBoardList = async ({ pageParam = -1 }) => {
    const response = await getBoardData(4, String(pageParam));
    const result = response.data;
    const nextPage = result.next_max_id;
    return {
      result: result.boards,
      nextPage,
      isLast: nextPage < 1,
    };
  };

  const query = useInfiniteQuery<
    { result: [Board]; nextPage: number; isLast: boolean },
    AxiosError<Api>
  >('[boardlist]', fetchBoardList, {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getNextPageParam: (lastPage, _pages) => {
      if (!lastPage.isLast) return lastPage.nextPage;
      return undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
    onError: (error) => unauthCheck(error),
  });

  return query;
};

export default useBoardQuery;
