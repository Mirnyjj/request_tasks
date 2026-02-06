export type Priority = "critical" | "high" | "medium" | "low";
export type Status =
  | "new"
  | "in-progress"
  | "ready"
  | "closed"
  | "rejected"
  | "pending"
  | "waiting-parts";

export interface Request {
  id: string;
  pharmacyNumber: string;
  pharmacyAddress: string;
  createdAt: number;
  priority: Priority;
  topic: string;
  category: string;
  technician: string | null;
  reactionTime: number | null;
  resolutionTime: number | null;
  status: Status;
}

export interface NewRequestFormData {
  pharmacyId: string;
  priority: Priority;
  topic: string;
  category: string;
  description: string;
  isWarranty: boolean;
  files: File[];
}

export interface ColumnFilters {
  id: string | null;
  pharmacyAddress: string | null;
  createdAt: string | null;
  priority: Priority | null;
  topic: string | null;
  category: string | null;
  technician: string | null;
  reactionTime: string | null;
  resolutionTime: string | null;
  status: Status | null;
}

export type Stage = "reaction" | "resolution";

export type SLAColor = "green" | "red" | "gray";
