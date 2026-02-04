import {
  Flex,
  Button,
  Badge,
  IconButton,
  Text,
  Stack,
  Box,
  Link,
  Avatar,
} from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";

export const NavigationPanel = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      pl="130px"
      pr="34px"
      py="22px"
      bg="white"
      shadow="md"
      h="16"
    >
      <Stack direction="row" gap={6}>
        <Link href="/requests">
          <Button variant="ghost" size="lg">
            Заявки
          </Button>
        </Link>

        <Link href="/reports">
          <Button variant="ghost" size="lg">
            Отчёты
          </Button>
        </Link>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="ghost" size="lg">
              Справочники
            </Button>
          </Menu.Trigger>

          <Menu.Content>
            <Menu.Item value="pharmacies" asChild>
              <Link href="/references/pharmacies">Аптеки</Link>
            </Menu.Item>
            <Menu.Item value="technicians" asChild>
              <Link href="/references/technicians">Техники</Link>
            </Menu.Item>
            <Menu.Item value="categories" asChild>
              <Link href="/references/categories">Категории</Link>
            </Menu.Item>
            <Menu.Item value="priorities" asChild>
              <Link href="/references/priorities">Приоритеты</Link>
            </Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </Stack>

      <Stack direction="row" gap={5} align="center">
        <Box position="relative">
          <IconButton
            aria-label="Уведомления"
            variant="ghost"
            size="lg"
          ></IconButton>
          <Badge
            position="absolute"
            top="0"
            right="0"
            colorScheme="orange"
            borderRadius="full"
            fontSize="0.7em"
          >
            3
          </Badge>
        </Box>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="ghost">
              <Stack direction="row" gap={3} align="center">
                <Avatar.Root size="sm">
                  <Avatar.Fallback>ИИ</Avatar.Fallback>
                  <Avatar.Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
                </Avatar.Root>
              </Stack>
            </Button>
          </Menu.Trigger>
        </Menu.Root>

        <Button colorScheme="red" variant="outline" size="sm">
          Выйти
        </Button>
      </Stack>
    </Flex>
  );
};
