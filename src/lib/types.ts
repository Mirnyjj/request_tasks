import type { Dispatch, SetStateAction } from "react";

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
  createdAt: number | null;
  priority: Priority | null;
  topic: string | null;
  category: string | null;
  technician: string | null;
  reactionTime: number | null;
  resolutionTime: number | null;
  status: Status | null;
}

export type Stage = "reaction" | "resolution";

export type SLAColor = "green" | "red" | "gray";

export interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export type FormErrors = Partial<Record<keyof NewRequestFormData, string>>;

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateNew: () => void;
}

export type FieldFormProps = {
  handleChange: <K extends keyof NewRequestFormData>(
    field: K,
    value: NewRequestFormData[K]
  ) => void;
  formData: NewRequestFormData;
  setFormData?: Dispatch<SetStateAction<NewRequestFormData>>;
};
