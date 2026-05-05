export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  mobile: number | string;
  description: string;
  medical_school_affiliation: string;
}

export interface ContactItem {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  subject: string;
  mobile?: string;
  medical_school_affiliation?: string;
  description?: string;
  createdAt?: string;
  created_at?: string;
}
