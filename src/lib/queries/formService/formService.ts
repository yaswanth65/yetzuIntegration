import { api } from "@/lib/axios";
import { ContactFormPayload } from "./types";

export const formService = {
  postContactInfo: async (payload: ContactFormPayload) => {
    const res = await api.post("/form/v1/contact", payload);
    return res?.data;
  },
};
