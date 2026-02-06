import type { Stage, Status } from "@/lib/types";

export const isStageApplicable = (stage: Stage, status: Status): boolean => {
  console.log(stage, status);
  if (stage === "reaction") return true;
  return status !== "new" && status !== "pending";
};
