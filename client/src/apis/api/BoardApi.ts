import { AxiosResponse } from 'axios';
import { defaultInstance } from '../utils';
import { Api, BoardApi, LikeListApi } from '../../types/responseData';

/**
 * @param count 서버에서 받아올 데이터의 수
 * @param maxId 이전에 전달받은 데이터의 마지막 ID. null일 경우 첫 요청.
 * @returns 서버와의 통신 이후 결과를 보내준다.
 */
const getBoardData = async (
  count: number,
  maxId: string | null,
): Promise<BoardApi> => {
  const { data }: AxiosResponse<BoardApi> = await defaultInstance.get(
    `/api/board?count=${count}&max_id=${maxId}`,
  );
  return data;
};

/**
 * @param boardId 삭제할 게시물의 ID
 * @param userId 해당 게시물을 작성한 user ID
 * @returns 서버와의 통신 이후 결과를 보내준다.
 */

// 이거 약간 궁금한게 있습니다.
const deleteBoardData = async (
  boardId: string,
  userId: number,
): Promise<Api> => {
  const { data }: AxiosResponse<Api> = await defaultInstance.delete(
    '/api/board',
    { data: { boardId, userId } },
  );
  return data;
};

/**
 * @param boardId 수정할 게시물의 ID
 * @param userId 해당 게시물을 작성한 user ID
 * @param content 수정할 본문 내용
 * @returns 서버와의 통신 이후 결과를 보내준다.
 */
const updateBoardData = async (
  boardId: string,
  userId: number,
  content: string,
): Promise<Api> => {
  const { data }: AxiosResponse<Api> = await defaultInstance.patch(
    '/api/board',
    { boardId, userId, content },
  );
  return data;
};

/**
 * @param boardId 좋아요할 게시물의 ID
 * @param userId 좋아요를 요청하는 user ID
 * @returns 서버와의 통신 이후 결과를 보내준다.
 */
const postLikeBoard = async (boardId: string, userId: number): Promise<Api> => {
  const { data }: AxiosResponse<Api> = await defaultInstance.post(
    '/api/board/like',
    { boardId, userId },
  );
  return data;
};

/**
 * @param boardId 좋아요를 취소할 게시물의 ID
 * @param userId 좋아요 취소를 요청하는 user ID
 * @returns 서버와의 통신 이후 결과를 보내준다.
 */
const deleteLikeBoard = async (
  boardId: string,
  userId: number,
): Promise<Api> => {
  const { data }: AxiosResponse<Api> = await defaultInstance.delete(
    '/api/board/like',
    { data: { boardId, userId } },
  );
  return data;
};

/**
 * @param boardId 좋아요를 누른 사람들의 목록을 가져올 게시물의 ID
 * @returns 서버와의 통신 이후 결과를 보내준다.
 */
const getLikeList = async (boardId: string) => {
  const { data }: AxiosResponse<LikeListApi> = await defaultInstance.get(
    `/api/board/like?boardId=${boardId}`,
    {},
  );
  return data;
};

export {
  getBoardData,
  deleteBoardData,
  updateBoardData,
  postLikeBoard,
  deleteLikeBoard,
  getLikeList,
};
