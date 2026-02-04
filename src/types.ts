export type RequestStatusKey =
  | "new"
  | "rejected"
  | "pending"
  | "in_progress"
  | "waiting_parts"
  | "ready"
  | "closed";

export type RequestTableColumnKey =
  | "id"
  | "pharmacy"
  | "createdAt"
  | "priority"
  | "subject"
  | "category"
  | "technician"
  | "reaction"
  | "resolution"
  | "status";

export type Priority = "high" | "medium" | "low" | "critical";

export type Pharmacy = {
  id: number;
  city: string;
  address: string;
};

export type RequestData = {
  id: string;
  pharmacy: Pharmacy;
  createdAt: number;
  priority: Priority;
  subject: string;
  category: string;
  technician: string | null;
  reaction: number | null;
  resolution: number | null;
  status: RequestStatusKey;
};
