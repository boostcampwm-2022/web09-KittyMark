export interface Api {
  statusCode: number;
  message: string;
  error?: string;
}

export interface LoginApi extends Api {
  email?: string;
  redirect?: boolean;
  data?: {
    userId: number;
    userName: string;
  };
}

export interface NameCheckApi extends Api {
  data: {
    isExist: boolean;
  };
}

export interface Comments {
  content: string; // 본문 내용
  createdAt: string; // 올린 시간
  id: number; // 이 댓글의 고유 아이디
  user: {
    id: number;
    name: string;
    profileUrl: string;
  };
}

export interface CommentApi extends Api {
  data: {
    comments: [Comments];
    next_max_id: number;
  };
  next_max_id: number;
}

export interface NewCommentApi extends Api {
  data?: {
    commentId: number;
  };
}

export interface NewPostApi extends Api {
  data?: {
    boardId: number;
  };
}

export interface Board {
  id: string;
  content: string;
  isStreet: boolean;
  like: number;
  comment: number;
  createAt: string;
  location: string | '';
  coordinate: number[];
  photos: {
    url: string;
  }[];
  user: {
    id: number;
    name: string;
    profileUrl: string;
  };
}

export interface BoardApi extends Api {
  data?: {
    boards: [Board];
    nextMaxId: number;
    count: number;
  };
}

export interface LikeListApi extends Api {
  data?: {
    users: {
      id: number;
      name: string;
      profileUrl: string;
    };
  };
}

export interface UserInfo {
  userId: number;
  userName: string;
  userProfileUrl: string;
  boards: { count: number };
  follow: {
    count: number;
  };
  followed_by: {
    count: number;
  };
  followed_by_viewer: boolean;
  follows_viewer: boolean;
}

export interface UserInfoApi extends Api {
  data: UserInfo;
}

// TODO 보드 관련 인터페이스가 두개인게 이거 일을 반복하는 일 같음

export interface UserPost {
  id: string;
  content: string;
  isStreet: boolean;
  location: string | null;
  latitude: number;
  longitude: number;
  like: number;
  created_at: string;
  photos: [{ url: string }];
  user: {
    id: number;
    name: string;
    profileUrl: string;
  };
}

export interface UserPostApi extends Api {
  data: {
    boards: [UserPost];
    count: number;
    next_max_id: number;
  };
}

export interface MapApi extends Api {
  data?: {
    boards: [Board];
  };
}

export interface FollowedByUser {
  id: number;
  name: string;
  profileUrl: string;
}

export interface FollowUser {
  id: number;
  name: string;
  profileUrl: string;
  is_followed_by_user: boolean;
}

export interface FollowListData {
  userId: number;
  users_followed_by_user: FollowedByUser[];
  users_follow_user: FollowUser[];
}

export interface FollowListApi extends Api {
  data: FollowListData;
}
