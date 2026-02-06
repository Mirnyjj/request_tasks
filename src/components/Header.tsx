import {
  Box,
  Flex,
  Button,
  Badge,
  Stack,
  Link,
  Menu,
  Avatar,
  createListCollection,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Text,
} from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";

import { GoTriangleDown } from "react-icons/go";
import { PiSignOutBold } from "react-icons/pi";
import ImageAva from "../assets/аааа.png";

const items = [
  { id: "reference/apteki", label: "Аптеки" },
  { id: "reference/tekhniki", label: "Техники" },
  { id: "reference/kategorii", label: "Категории" },
  { id: "reference/prioriteti", label: "Приоритеты" },
];
const navItems = [
  { id: "requests", label: "Заявки" },
  { id: "reports", label: "Отчеты" },
];

const collection = createListCollection({ items });

type HeaderProps = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
};

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px="34px"
      pt="22px"
      pb="24px"
      bg="white"
      borderBottom="1px solid"
      borderBottomColor="rgba(217, 225, 236, 1)"
    >
      <Stack
        direction="row"
        gap="35px"
        fontFamily="Inter"
        fontWeight={400}
        fontSize="16px"
        lineHeight="24px"
        letterSpacing="0px"
      >
        <Flex gap="14px">
          {navItems.map((item) => (
            <Link
              key={item.id}
              color={activeTab === item.id ? "gray.900" : "gray.500"}
              onClick={() => setActiveTab(item.id)}
              href={item.id}
              textDecoration="none"
              fontWeight={400}
              border="0"
              outline="none"
              _hover={{
                textDecoration: "none",

                transform: "translateY(-5px)",

                transition: "all 0.2s ease-in-out",
              }}
              _active={{
                transform: "translateY(0px)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </Flex>

        <SelectRoot
          collection={collection}
          display="flex"
          width="100%"
          flexDirection="column"
          position="relative"
        >
          <SelectTrigger
            border="none"
            borderWidth="0"
            display="flex"
            alignItems="center"
            gap="2"
            padding={0}
            position="relative"
            zIndex="1"
            _hover={{
              textDecoration: "none",

              transform: "translateY(-5px)",
              transition: "all 0.2s ease-in-out",
            }}
            _active={{
              transform: "translateY(0px)",
            }}
          >
            <Text fontFamily="Inter" fontWeight={500}>
              Справочники
            </Text>
            <GoTriangleDown size={16} />
          </SelectTrigger>

          <SelectContent
            width="100%"
            position="absolute"
            top="100%"
            left="0"
            mt="1"
          >
            {items.map((item) => (
              <SelectItem
                key={item.id}
                item={item.label}
                justifyContent="center"
              >
                <Text textAlign="center" fontWeight={400}></Text>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Stack>

      <Stack direction="row" gap={5} align="center">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="ghost" asChild>
              <Stack direction="row" gap={3} align="center">
                <Avatar.Root width="36px" height="36px">
                  <Avatar.Image src={ImageAva} />
                </Avatar.Root>

                <Box position="relative">
                  <Badge
                    position="absolute"
                    width="20px"
                    height="20px"
                    top="0"
                    right="0"
                    color="white"
                    bg="rgba(185, 60, 60, 1)"
                    borderRadius="full"
                  >
                    3
                  </Badge>
                </Box>
              </Stack>
            </Button>
          </Menu.Trigger>

          <Menu.Content>
            <Menu.Item value="profile" asChild>
              <Link href="/profile">Профиль</Link>
            </Menu.Item>
            <Menu.Item value="settings" asChild>
              <Link href="/settings">Настройки</Link>
            </Menu.Item>
          </Menu.Content>
        </Menu.Root>

        <Button
          bgColor="inherit"
          variant="outline"
          display="flex"
          gap="4px"
          padding="11px 21px 11px 24px"
          bg="rgba(241, 241, 241, 1)"
          border="1px solid rgba(217, 225, 236, 1)"
          color="gray.700"
          _hover={{
            bg: "red.50",
            borderColor: "red.400",
            color: "red.600",
            boxShadow: "sm",
            transition: "all 0.2s ease",
          }}
        >
          <PiSignOutBold width="24px" height="24px" />
          <Text
            fontFamily="Inter"
            fontWeight={400}
            fontSize="16px"
            lineHeight="24px"
            letterSpacing="0px"
          >
            Выйти
          </Text>
        </Button>
      </Stack>
    </Flex>
  );
}
