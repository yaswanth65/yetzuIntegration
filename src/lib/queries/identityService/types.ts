export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignupPayload = {
  email: string;
  password: string;
  name: string;
  role: string;
};

export type BaseSuccessResponse = {
  message: string;
  success: boolean;
};

export type SignupResponse = {
  message: string;
  success: boolean;
};

export type Identity = {
  user_id: string;
  provider: string;
  connection: string;
  isSocial: boolean;
};

export type UserProfileData = {
  created_at: string;
  email: string;
  email_verified: boolean;
  identities: Identity;
  name: string;
  role: string;
  updated_at: string;
  user_id: string;
  last_ip: string;
  last_login: string;
  last_password_reset: string;
  logins_count: number;
};

export type UserData = {
  access_token: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
  error: string | null;
  error_description: string | null;
  jwtToken: string;
};

export type LoginResponse = {
  userData: UserData;
  userProfileData: UserProfileData;
  data: Record<string, any>;
  success: boolean;
  message: string;
  statusCode: number;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  lastIp: string;
};

export type GetUserProfileResponse = {
  success: boolean;
  message: string;
  user: User;
};
