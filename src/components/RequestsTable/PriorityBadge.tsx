import { Flex, Text } from "@chakra-ui/react";
import type { Priority } from "../../lib/types";
import {
  HiOutlineChevronDoubleUp,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import { PiDiamond } from "react-icons/pi";

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const config = {
    critical: {
      icon: "chevronDoubleUp",
      color: "rgba(185, 60, 60, 1)",
      label: "Критич.",
    },
    high: {
      icon: "chevronUp",
      color: "rgba(185, 60, 60, 1)",
      label: "Высокий",
    },
    medium: {
      icon: "diamond",
      color: "rgba(204, 137, 42, 1)",
      label: "Средний",
    },
    low: {
      icon: "chevronDown",
      color: "rgba(45, 96, 237, 1)",
      label: "Низкий",
    },
  };

  const { icon, color, label } = config[priority];

  return (
    <Flex align="center" gap="1">
      {icon === "chevronDoubleUp" && (
        <HiOutlineChevronDoubleUp size="24px" color={color} />
      )}
      {icon === "chevronUp" && <HiOutlineChevronUp size="24px" color={color} />}
      {icon === "chevronDown" && (
        <HiOutlineChevronDown size="24px" color={color} />
      )}
      {icon === "diamond" && <PiDiamond size="24px" color={color} />}
      <Text
        fontFamily="Inter"
        fontWeight={500}
        fontSize="12px"
        lineHeight="24px"
        letterSpacing="0px"
        color="grey"
      >
        {label}
      </Text>
    </Flex>
  );
}
