export interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number;   // 1–5
  comment: string;
  createdAt: string; // ISO string
}
