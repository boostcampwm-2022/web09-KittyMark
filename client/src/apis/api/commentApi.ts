import { AxiosResponse } from 'axios';
import { defaultInstance } from '../utils';
// type
import { Api, CommentApi, NewCommentApi } from '../../types/responseData';

const getCommentInfo = async (boardId: number): Promise<CommentApi> => {
  const { data }: AxiosResponse<CommentApi> = await defaultInstance.get(
    `/api/comment?board_id=${boardId}&count=100000&max_id=-1`,
  );
  return data;
};

const postCommentInfo = async (
  userId: number,
  boardId: number,
  content: string,
  rootCommentId: number | null,
): Promise<NewCommentApi> => {
  const reqBody = rootCommentId
    ? { userId, boardId, content, rootCommentId }
    : { userId, boardId, content };
  const { data }: AxiosResponse<NewCommentApi> = await defaultInstance.post(
    `/api/comment`,
    reqBody,
  );
  return data;
};

const patchCommentInfo = async (
  commentId: number,
  userId: number,
  content: string,
): Promise<Api> => {
  const { data }: AxiosResponse<Api> = await defaultInstance.patch(
    `/api/comment/${commentId}`,
    { userId, content },
  );

  return data;
};

const deleteCommentInfo = async (
  commentId: number,
  userId: number,
  boardId: number,
): Promise<Api> => {
  const { data }: AxiosResponse<Api> = await defaultInstance.delete(
    `/api/comment/${commentId}`,
    { data: { boardId, userId } },
  );

  return data;
};

export { getCommentInfo, postCommentInfo, patchCommentInfo, deleteCommentInfo };
