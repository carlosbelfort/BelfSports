export type SpotStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Spot {
  id: string;
  name: string;
  description?: string;
  status: SpotStatus;
  imageUrl?: string;

  event: {
    id: string;
    title: string;
    date?: string;
  };

  user: {
    id: string;
    name: string;
    email: string;
  };
}