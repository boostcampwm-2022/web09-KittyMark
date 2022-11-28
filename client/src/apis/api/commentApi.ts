import { AxiosResponse } from 'axios';
import { defaultInstance } from '../utils';
// type
import { CommentApi, NewCommentApi } from '../../types/responseData';

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
  const { data }: AxiosResponse<NewCommentApi> = await defaultInstance.post(
    `/api/comment`,
    { userId, boardId, content, rootCommentId },
  );
  return data;
};

export { getCommentInfo, postCommentInfo };
