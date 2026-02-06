import { Badge } from "@chakra-ui/react";
import type { Status } from "../../lib/types";

export default function StatusBadge({ status }: { status: Status }) {
  const config: Record<Status, { bg: string; color: string; label: string }> = {
    new: { bg: "red.50", color: "red.600", label: "Новая" },
    "in-progress": { bg: "yellow.50", color: "yellow.700", label: "В работе" },
    ready: { bg: "green.100", color: "green.700", label: "Готово" },
    closed: { bg: "gray.100", color: "gray.600", label: "Закрыто" },
    rejected: { bg: "red.100", color: "red.700", label: "Отклонено" },
    pending: { bg: "blue.50", color: "blue.700", label: "На рассмотрении" },
    "waiting-parts": {
      bg: "orange.50",
      color: "orange.700",
      label: "Ожидает запчасти",
    },
  };

  const { bg, color, label } = config[status];

  return (
    <Badge
      bg={bg}
      color={color}
      px="3"
      py="1"
      borderRadius="md"
      fontWeight="medium"
      fontSize="sm"
    >
      {label}
    </Badge>
  );
}
