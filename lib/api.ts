import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FormData {
  id?: string;
  name: string;
  description?: string;
  elements: any[];
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubmissionData {
  id?: string;
  formId: string;
  data: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

// Form API functions
export const getForms = async (): Promise<FormData[]> => {
  const response = await api.get('/forms');
  return response.data;
};

export const getFormById = async (id: string): Promise<FormData> => {
  const response = await api.get(`/forms/${id}`);
  return response.data;
};

export const createForm = async (formData: FormData): Promise<FormData> => {
  const response = await api.post('/forms', formData);
  return response.data;
};

export const updateForm = async (id: string, formData: Partial<FormData>): Promise<FormData> => {
  const response = await api.put(`/forms/${id}`, formData);
  return response.data;
};

export const deleteForm = async (id: string): Promise<void> => {
  await api.delete(`/forms/${id}`);
};

export const togglePublishForm = async (id: string): Promise<FormData> => {
  const response = await api.patch(`/forms/${id}/publish`);
  return response.data;
};

// Submission API functions
export const getFormSubmissions = async (formId: string): Promise<SubmissionData[]> => {
  const response = await api.get(`/submissions/form/${formId}`);
  return response.data;
};

export const getSubmissionById = async (id: string): Promise<SubmissionData> => {
  const response = await api.get(`/submissions/${id}`);
  return response.data;
};

export const createSubmission = async (submissionData: SubmissionData): Promise<SubmissionData> => {
  const response = await api.post('/submissions', submissionData);
  return response.data;
};

export const deleteSubmission = async (id: string): Promise<void> => {
  await api.delete(`/submissions/${id}`);
};

export default api;