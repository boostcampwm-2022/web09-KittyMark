export interface Api {
  statusCode: number;
  message: string;
  error?: string;
}

export interface LoginApi extends Api {
  data: {
    userId: number;
    userName: string;
    userProfileUrl: string;
  };
}

export interface RedirectApi extends Api {
  redirect: boolean;
  data: {
    url: string;
    email: string;
    oauthInfo: string;
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
  id: number;
  content: string;
  isStreet: boolean;
  like: number;
  comment: number;
  createdAt: string;
  isLiked: boolean;
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
  data: {
    boards: [Board];
    next_max_id: number;
    count: number;
  };
}

export interface LikeApi extends Api {
  data: {
    likeCount: number;
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

export interface UserPostApi extends Api {
  data: {
    boards: [Board];
    count: number;
    next_max_id: number;
  };
}

export interface MapApi extends Api {
  data?: {
    boards: [Board];
  };
}

export interface FollowUserData {
  id: number;
  name: string;
  profile_url: string;
  is_followed_by_viewer: boolean;
}

export interface FollowListData {
  userId: number;
  users_followed_by_user: FollowUserData[];
  users_follow_user: FollowUserData[];
}

export interface FollowListApi extends Api {
  data: FollowListData;
}

export interface ModifyUserApi extends Api {
  data?: {
    profileUrl: string | null;
  };
}
