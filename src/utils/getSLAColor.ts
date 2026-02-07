import type { Priority, SLAColor, Stage, Status } from "@/lib/types";
import { isStageApplicable } from "./isStageApplicable";
import { SLA_LIMITS } from "@/lib/mockData";

export function getSLAColor(params: {
  createdAt: number;
  stageTime: number | null;
  priority: Priority;
  stage: Stage;
  status: Status;
}): SLAColor {
  const { createdAt, stageTime, priority, stage, status } = params;

  if (!isStageApplicable(stage, status)) {
    return "gray";
  }

  if (stageTime == null) {
    return "gray";
  }

  const elapsedMs = stageTime - createdAt;
  const limit = SLA_LIMITS[priority][stage];

  return elapsedMs <= limit ? "green" : "red";
}
