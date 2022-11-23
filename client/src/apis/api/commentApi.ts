import { AxiosResponse } from 'axios';
import { defaultInstance } from '../utils';
// type
import { CommentApi, NewCommentApi } from '../../types/responseData';

const getCommentInfo = async (boardId: number): Promise<CommentApi> => {
  const { data }: AxiosResponse<CommentApi> = await defaultInstance.get(
    `/api/board/${boardId}/comment?count=100000`,
  );
  return data;
};

const postCommentInfo = async (
  userId: number,
  boardId: number,
  content: string,
  rootRecommentId: number | null,
): Promise<NewCommentApi> => {
  const { data }: AxiosResponse<NewCommentApi> = await defaultInstance.post(
    `/api/comment`,
    { userId, boardId, content, rootRecommentId },
  );
  return data;
};

export { getCommentInfo, postCommentInfo };
