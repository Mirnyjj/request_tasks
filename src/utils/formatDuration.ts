import type { Request } from "@/lib/types";

export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (v: number) => v.toString().padStart(2, "0");

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  return `${pad(minutes)}:${pad(seconds)}`;
}

export const getReactionDuration = (r: Request) =>
  r.reactionTime ? r.reactionTime - r.createdAt : null;

export const getResolutionDuration = (r: Request) =>
  r.resolutionTime ? r.resolutionTime - r.createdAt : null;
