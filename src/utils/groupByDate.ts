import { MONTHS_PREPOSITIONAL } from "@/lib/mockData";
import type { Request } from "@/lib/types";

export function groupByDate(requests: Request[]) {
  const groupsMap: Record<string, Request[]> = {};

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  requests.forEach((request) => {
    const date = new Date(request.createdAt);

    let label = "";

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      label = "СЕГОДНЯ";
    } else if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      label = "ВЧЕРА";
    } else {
      label = `В ${
        MONTHS_PREPOSITIONAL[date.getMonth()]
      } ${date.getFullYear()}`.toUpperCase();
    }

    if (!groupsMap[label]) groupsMap[label] = [];
    groupsMap[label].push(request);
  });

  const sortedLabels = Object.keys(groupsMap).sort((a, b) => {
    const dateA = new Date(groupsMap[a][0].createdAt).getTime();
    const dateB = new Date(groupsMap[b][0].createdAt).getTime();
    return dateB - dateA;
  });

  return sortedLabels.map((label) => ({ label, requests: groupsMap[label] }));
}
