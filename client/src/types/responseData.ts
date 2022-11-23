export interface Api {
  code: number;
  message: string;
}

export interface LoginApi extends Api {
  email?: string;
  redirect?: boolean;
}

export interface Comments {
  content: string; // 본문 내용
  createdAt: string; // 올린 시간
  commentId: number; // 이 댓글의 고유 아이디
  userName: string; // 유저의 닉네임
  userProfile: string; // 유저의 프로필 이미지 경로
}

export interface CommentApi extends Api {
  comments: [Comments];
  next_max_id: number;
}

export interface Board {
  userId: number;
  userName: string;
  userProfile: string;
  boardId: string;
  content: string;
  url: string[];
  like: number;
  comment: number;
  createAt: string;
  location: string | null;
}

export interface BoardApi extends Api {
  boards?: [Board];
  nextMaxId?: number;
  count?: number;
}
