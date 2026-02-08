import type { ColumnFilters, Request } from "@/lib/types";
import {
  getReactionDuration,
  getResolutionDuration,
} from "@/utils/formatDuration";
import { useMemo, useState } from "react";

export function useRequestsTable(requests: Request[]) {
  const [filters, setFilters] = useState<ColumnFilters>({
    id: null,
    pharmacyAddress: null,
    createdAt: null,
    priority: null,
    topic: null,
    category: null,
    technician: null,
    reactionTime: null,
    resolutionTime: null,
    status: null,
  });
  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (filters.id && !r.id.toLowerCase().includes(filters.id.toLowerCase()))
        return false;

      if (
        filters.pharmacyAddress &&
        !r.pharmacyAddress
          .toLowerCase()
          .includes(filters.pharmacyAddress.toLowerCase())
      )
        return false;

      if (filters.priority && r.priority !== filters.priority) return false;
      if (filters.category && r.category !== filters.category) return false;

      if (
        filters.technician &&
        !(r.technician || "")
          .toLowerCase()
          .includes(filters.technician.toLowerCase())
      )
        return false;

      if (filters.status && r.status !== filters.status) return false;

      if (
        filters.topic &&
        !r.topic.toLowerCase().includes(filters.topic.toLowerCase())
      )
        return false;

      if (filters.createdAt && r.createdAt !== +filters.createdAt) return false;

      if (filters.reactionTime) {
        const duration = getReactionDuration(r);
        if (duration === null) return false;
        if (duration !== Number(filters.reactionTime)) return false;
      }

      if (filters.resolutionTime) {
        const duration = getResolutionDuration(r);
        if (duration === null) return false;
        if (duration !== Number(filters.resolutionTime)) return false;
      }

      return true;
    });
  }, [requests, filters]);

  const handleFilterChange = (key: keyof Request, value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    data: filtered,
    filters,
    setFilters,
    handleFilterChange,
  };
}
