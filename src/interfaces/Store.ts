export interface IAuthor {
  id: string;
  name: string;
  surname: string;
}
export interface IPost {
  id: string;
  author: IAuthor;
  content: string;
  "content-title": string;
  "image-url": string;
}

export interface ITokens {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface IUserInfo {
  email: string;
  userId: string;
  localId: string;
  addedAuthors: Set<string> | null;
  readLaterArr: Set<string> | null;
}

export interface StateMain {
  posts: IPost[];
  post: null | IPost;
  loading: boolean;
  isOverlayActive: boolean;
}

export interface StateAuth {
  error: string;
  userInfo: IUserInfo;
  tokens: ITokens;
}

export interface IResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}
