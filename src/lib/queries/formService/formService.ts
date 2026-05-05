import { api, authApi } from "@/lib/axios";
import { ContactFormPayload } from "./types";

export const formService = {
  postContactInfo: async (payload: ContactFormPayload) => {
    const res = await api.post("/api/form/v1/contact", payload);
    return res?.data;
  },

  getContacts: async (params?: { page?: number; limit?: number }) => {
    const res = await authApi.get("/api/admin/contacts", { params });
    return res?.data;
  },

  createContact: async (payload: ContactFormPayload) => {
    const res = await authApi.post("/api/admin/contacts", payload);
    return res?.data;
  },
};
