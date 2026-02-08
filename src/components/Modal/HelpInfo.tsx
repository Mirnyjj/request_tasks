import { Box, Flex, Grid, List, Text } from "@chakra-ui/react";
import { IoMdWarning } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";

const helpNeeded = [
  "температура в камере выше допустимой нормы (+2...+8 °C) и не восстанавливается",
  "оборудование издаёт необычные шумы (гул, стук, вибрация)",
  "есть ошибка на дисплее или аварийный сигнал",
  "дверь не закрывается/сломаны уплотнители",
  "холодильник не включается или выключается самопроизвольно",
];

const helpNotNeeded = [
  "просто загружено много товара, и температура временно повысилась",
  "дверь была оставлена открытой, и холодильник «догоняет» температуру",
  "требуется только разморозка (согласно регламенту её выполняет персонал аптеки)",
];

export const HelpInfo = () => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="12px">
      <Box bg="#FFFAD4" p="10px" borderRadius="10px" h="fit-content" minH="0">
        <Flex align="center" gap="2" mb="2">
          <IoMdWarning />
          <Text fontWeight="400" fontSize={{ base: "12px", md: "10px" }}>
            Заявка нужна, если:
          </Text>
        </Flex>
        <List.Root
          pl="20px"
          fontWeight="400"
          fontSize={{ base: "12px", md: "10px" }}
        >
          {helpNeeded.map((item, i) => (
            <List.Item
              _marker={{
                color: "black",
                fontSize: "12px",
              }}
              lineHeight="14px"
              key={i}
              textIndent="-4px"
            >
              {item}
            </List.Item>
          ))}
        </List.Root>
      </Box>

      <Box bg="#FFEAEA" p="10px" borderRadius="10px" h="fit-content" minH="0">
        <Flex align="center" gap="2" mb="2">
          <RiCloseLargeFill size={12} color="red" />
          <Text fontWeight="400" fontSize={{ base: "12px", md: "10px" }}>
            Заявку создавать не нужно, если:
          </Text>
        </Flex>
        <List.Root
          pl="20px"
          fontWeight="400"
          fontSize={{ base: "12px", md: "10px" }}
        >
          {helpNotNeeded.map((item, i) => (
            <List.Item
              key={i}
              _marker={{
                color: "black",
                fontSize: "12px",
              }}
              lineHeight="14px"
              textIndent="-4px"
            >
              {item}
            </List.Item>
          ))}
        </List.Root>
      </Box>
    </Grid>
  );
};
