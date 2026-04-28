"use client";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { identityService } from "./identityService";
import Cookies from "js-cookie";
import { getJwtUserId } from "@/lib/axios";
import {
  BaseSuccessResponse,
  GetUserProfileResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  SignupPayload,
  SignupResponse,
} from "./types";
import toast from "react-hot-toast";

const useGetUserProfile = (): UseQueryResult<
  GetUserProfileResponse,
  unknown
> => {
  const jwtToken = Cookies.get("jwtToken") || "";
  const refreshToken = Cookies.get("refreshToken") || "";
  return useQuery<GetUserProfileResponse>({
    queryKey: ["getUserProfile"],
    queryFn: identityService.getUserProfile,
    enabled: !!jwtToken || !!refreshToken,
    refetchInterval: false,
  });
};

const useRenewAccessTokenMutation = (): UseMutationResult<
  LoginResponse,
  unknown,
  void
> => {
  return useMutation<LoginResponse, unknown, void>({
    mutationFn: identityService.getAccessToken,
    onSuccess: (data) => {
      const jwtToken = data?.userData?.jwtToken;
      if (jwtToken) {
        Cookies.set("jwtToken", jwtToken, { expires: 1 });
        const userId = getJwtUserId(jwtToken);
        if (userId) Cookies.set("userId", userId, { expires: 1 });
      }
      if (data?.userData?.refresh_token) Cookies.set("refreshToken", data.userData.refresh_token, { expires: 7 });
    },
  });
};

const useLoginMutation = (): UseMutationResult<
  LoginResponse,
  unknown,
  LoginPayload
> => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: identityService.login,
    onSuccess: (data, variables) => {
      if (data?.userData?.jwtToken) {
        Cookies.set("jwtToken", data.userData.jwtToken, { expires: 1 });
        const userId = getJwtUserId(data.userData.jwtToken);
        if (userId) Cookies.set("userId", userId, { expires: 1 });
        if (variables?.rememberMe) {
          Cookies.set("refreshToken", data.userData.refresh_token, {
            expires: 7,
          });
        }
        queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
      }
    },
  });
};

const useGoogleLoginMutation = (): UseMutationResult<
  LoginResponse,
  unknown,
  { idToken: string }
> => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, unknown, { idToken: string }>({
    mutationFn: ({ idToken }) => identityService.googleLogin(idToken),
    onSuccess: (data) => {
      if (data?.userData?.jwtToken) {
        Cookies.set("jwtToken", data.userData.jwtToken, { expires: 1 });
        const userId = getJwtUserId(data.userData.jwtToken);
        if (userId) Cookies.set("userId", userId, { expires: 1 });
        Cookies.set("refreshToken", data.userData.refresh_token, { expires: 7 });
      }
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
  });
};

const useLogoutMutation = (): UseMutationResult<
  LogoutResponse,
  unknown,
  { userId: string }
> => {
  const queryClient = useQueryClient();
  return useMutation<LogoutResponse, unknown, { userId: string }>({
    mutationFn: ({ userId }) => identityService.logout(userId),
    onSuccess: () => {
      Cookies.remove("jwtToken");
      Cookies.remove("refreshToken");
      Cookies.remove("isUserLoggedIn");
      Cookies.remove("userId");
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
  });
};

const useSignUpMutation = (): UseMutationResult<
  SignupResponse,
  unknown,
  SignupPayload
> => {
  const { mutateAsync: login } = useLoginMutation();
  const queryClient = useQueryClient();
  return useMutation<SignupResponse, unknown, SignupPayload>({
    mutationFn: identityService.signup,
    onSuccess: async (data, variables) => {
      try {
        const res = await login({
          email: variables.email,
          password: variables.password,
          rememberMe: false,
        });
      } catch {
        toast.error("Error while logging in!");
      }
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
  });
};

const useForgotPasswordMutation = (): UseMutationResult<
  BaseSuccessResponse,
  unknown,
  { email: string }
> => {
  return useMutation<BaseSuccessResponse, unknown, { email: string }>({
    mutationFn: ({ email }) => identityService.forgotPassword(email),
  });
};

const useOtpVerificationMutation = (): UseMutationResult<
  BaseSuccessResponse,
  unknown,
  { email: string; otp: string }
> => {
  return useMutation<
    BaseSuccessResponse,
    unknown,
    { email: string; otp: string }
  >({
    mutationFn: ({ email, otp }) => identityService.verifyOtp(email, otp),
  });
};

const useResetPasswordMutation = (): UseMutationResult<
  BaseSuccessResponse,
  unknown,
  { email: string; otp: string; newPassword: string }
> => {
  return useMutation<
    BaseSuccessResponse,
    unknown,
    { email: string; otp: string; newPassword: string }
  >({
    mutationFn: ({ email, otp, newPassword }) =>
      identityService.resetPassowrd(email, otp, newPassword),
  });
};

export {
  useGetUserProfile,
  useLoginMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useOtpVerificationMutation,
  useResetPasswordMutation,
  useRenewAccessTokenMutation,
};
