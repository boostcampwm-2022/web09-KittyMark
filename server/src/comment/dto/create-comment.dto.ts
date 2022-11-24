export class CreateCommentDto {
  userId: number;
  boardId: number;
  content: string;
  rootCommentId: null | number;
}
