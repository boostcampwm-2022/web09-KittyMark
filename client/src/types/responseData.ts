export interface Api {
  code: number;
  message: string;
}

export interface LoginApi extends Api {
  email?: string;
  redirect?: boolean;
}
