import type { Request } from "@/lib/types";
import { formatDateTimeWithTs } from "./formatDateTimeWithTs";
import { formatDuration } from "./formatDuration";
import { priorities, statusTabs } from "@/lib/mockData";

export function getLabelFilterHeaderTable(
  filterKey: keyof Request | undefined,
  label: number | string
): string | number {
  //   console.log(filterKey, label);
  switch (filterKey) {
    case "createdAt":
      if (label === "Все") {
        return label;
      }
      const dateTime = formatDateTimeWithTs(+label);
      return dateTime.date + " " + dateTime.time;
    case "priority":
      if (label === "Все") {
        return label;
      }
      const res = priorities.filter((item) => item.value === label)[0].label;
      return res;

    case "reactionTime":
      if (label === "Все") {
        return label;
      }
      return formatDuration(+label);
    case "resolutionTime":
      if (label === "Все") {
        return label;
      }
      return formatDuration(+label);
    case "status":
      if (label === "Все") {
        return label;
      }
      const statusLabel = statusTabs.filter((item) => item.value === label)[0]
        .label;
      return statusLabel;

    default:
      return label;
  }
}
