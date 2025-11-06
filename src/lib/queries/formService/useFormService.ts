import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { formService } from "./formService";
import { ContactFormPayload } from "./types";

const { postContactInfo } = formService;

const usePostContactInfo = (): UseMutationResult<
  any,
  unknown,
  ContactFormPayload
> => {
  return useMutation<any, unknown, ContactFormPayload>({
    mutationFn: postContactInfo,
  });
};

export { usePostContactInfo };
