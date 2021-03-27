export interface AdditionalUserInfo {
  isAdmin: boolean;
}

export interface UserInfo extends AdditionalUserInfo {
  id: string;
  email: string;
}
