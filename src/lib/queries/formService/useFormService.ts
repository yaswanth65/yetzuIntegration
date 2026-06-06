import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { formService } from "./formService";
import { ContactFormPayload } from "./types";

const { postContactInfo, getContacts, createContact, deleteContact } = formService;

const usePostContactInfo = (): UseMutationResult<
  any,
  unknown,
  ContactFormPayload
> => {
  return useMutation<any, unknown, ContactFormPayload>({
    mutationFn: postContactInfo,
  });
};

const useGetContacts = (params?: {
  page?: number;
  limit?: number;
}): UseQueryResult<any, unknown> => {
  return useQuery<any, unknown>({
    queryKey: ["adminContacts", params],
    queryFn: () => getContacts(params),
  });
};

const useCreateContact = (): UseMutationResult<
  any,
  unknown,
  ContactFormPayload
> => {
  return useMutation<any, unknown, ContactFormPayload>({
    mutationFn: createContact,
  });
};

const useDeleteContact = (): UseMutationResult<any, unknown, string> => {
  return useMutation<any, unknown, string>({
    mutationFn: deleteContact,
  });
};

export { usePostContactInfo, useGetContacts, useCreateContact, useDeleteContact };
