import type { Priority, Stage, Status } from "@/lib/types";
import { formatDuration } from "@/utils/formatDuration";
import { getSLAColor } from "@/utils/getSLAColor";
import { Flex, Text } from "@chakra-ui/react";
import { BiTimer } from "react-icons/bi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";

export function renderSLACell(params: {
  createdAt: number;
  stageTime: number | null;
  priority: Priority;
  stage: Stage;
  status: Status;
}) {
  const { createdAt, stageTime, priority, stage, status } = params;

  if (!stageTime) {
    return <Text color="gray">—</Text>;
  }

  const elapsedMs = stageTime - createdAt;

  const color = getSLAColor({
    createdAt,
    stageTime,
    priority,
    stage,
    status,
  });

  const useBlack =
    status === "new" || (status === "in-progress" && stage === "resolution");

  const getIcon = () => {
    if (useBlack) {
      return <BiTimer size={14} color="black" />;
    }

    switch (color) {
      case "red":
        return <IoAlertCircleOutline size={14} color="red" />;
      case "green":
        return <IoIosCheckmarkCircleOutline size={14} color="green" />;
      default:
        return <BiTimer size={14} color="gray" />;
    }
  };

  return (
    <Flex
      flexDirection="row"
      flexWrap="wrap"
      boxSizing="border-box"
      alignItems="center"
      justifyContent="center"
      gap="4px"
      color={
        useBlack
          ? "black"
          : color === "red"
          ? "red"
          : color === "green"
          ? "green"
          : "gray"
      }
    >
      {getIcon()} {formatDuration(elapsedMs)}
    </Flex>
  );
}
