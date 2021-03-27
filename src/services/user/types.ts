export interface UserAdditionalInfoDTO {
  isAdmin: boolean;
}

export interface UserDTO extends UserAdditionalInfoDTO {
  id: string;
  email: string;
}
