import { Badge } from "@chakra-ui/react";
import type { Status } from "../../lib/types";

export default function StatusBadge({ status }: { status: Status }) {
  const config: Record<Status, { bg: string; label: string }> = {
    new: { bg: "#F0CDFA", label: "Новая" },
    "in-progress": { bg: "#FFEBB3", label: "В работе" },
    ready: { bg: "#A2E3A4", label: "Готово" },
    closed: { bg: "#F1F1F1", label: "Закрыто" },
    rejected: { bg: "red.100", label: "Отклонено" },
    pending: { bg: "blue.50", label: "На рассмотрении" },
    "waiting-parts": {
      bg: "orange.50",
      label: "Ожидает запчасти",
    },
  };

  const { bg, label } = config[status];

  return (
    <Badge
      bg={bg}
      px="6px"
      py="2px"
      borderRadius="4px"
      fontFamily="Inter, sans-serif"
      fontWeight={400}
      fontStyle="normal"
      fontSize="14px"
      lineHeight="20px"
      letterSpacing="0px"
    >
      {label}
    </Badge>
  );
}
