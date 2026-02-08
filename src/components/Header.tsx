import {
  Box,
  Flex,
  Button,
  Badge,
  Stack,
  Link,
  Avatar,
  createListCollection,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Text,
} from "@chakra-ui/react";

import { GoTriangleDown } from "react-icons/go";
import { PiSignOutBold } from "react-icons/pi";
import ImageAva from "../assets/аааа.png";
import { useEffect, useState } from "react";

const items = [
  { id: "/reference/apteki", label: "Аптеки" },
  { id: "/reference/tekhniki", label: "Техники" },
  { id: "/reference/kategorii", label: "Категории" },
  { id: "/reference/prioriteti", label: "Приоритеты" },
];
const navItems = [
  { id: "/requests", label: "Заявки" },
  { id: "/reports", label: "Отчеты" },
];

const collection = createListCollection({ items });

export function Header() {
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    setActivePath(path);
  }, [window.location.pathname]);
  const allLink = [...navItems, ...items];
  const activeLink =
    allLink.filter((item) => item.id === activePath)[0]?.label || "Заявки";
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      p={{ base: "16px" }}
      pr={{ md: "34px" }}
      pl={{ md: "130px" }}
      pt={{ md: "22px" }}
      pb={{ md: "24px" }}
      bg="white"
      borderBottom="1px solid"
      borderBottomColor="rgba(217, 225, 236, 1)"
    >
      <SelectRoot
        collection={collection}
        display={{ base: "flex", md: "none" }}
        width="100%"
        flexDirection="column"
        position="relative"
      >
        <SelectTrigger
          border="none"
          borderWidth="0"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap="5px"
          padding={0}
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
          <Text
            fontFamily="Inter"
            fontSize="20px"
            color="black"
            fontWeight={600}
          >
            {activeLink}
          </Text>
          <GoTriangleDown color="black" size="24px" />
        </SelectTrigger>

        <SelectContent
          width="100%"
          position="absolute"
          top="100%"
          left="0"
          mt="1"
        >
          {allLink.map((item) => (
            <SelectItem key={item.id} item={item.label} justifyContent="center">
              <Link
                key={item.id}
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
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      <Stack
        display={{ base: "none", md: "flex" }}
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
              color={activePath === item.id ? "gray.900" : "gray.500"}
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
            <Text
              fontFamily="Inter"
              fontWeight={500}
              color={activePath.includes("reference") ? "gray.900" : "gray.500"}
            >
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
        <Button asChild p={0} bg="transparent">
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

        <Button
          bgColor="inherit"
          variant="outline"
          display={{ base: "none", md: "flex" }}
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

//   return (
//     <Box as="header" borderBottomWidth="1px" borderColor="gray.200" bg="white">
//       <Flex
//         maxW="1600px"
//         mx="auto"
//         px="6"
//         h="64px"
//         align="center"
//         justify="space-between"
//       >
//         <Flex align="center" gap="8">
//           {navItems.map((item) => (
//             <Text
//               key={item.id}
//               fontWeight={activeTab === item.id ? "semibold" : "normal"}
//               color={activeTab === item.id ? "gray.900" : "gray.500"}
//               cursor="pointer"
//               onClick={() => onTabChange(item.id)}
//               _hover={{ color: "gray.700" }}
//               fontSize="sm"
//             >
//               {item.label}
//             </Text>
//           ))}

//           <Box position="relative">
//             <Button
//               variant="ghost"
//               fontWeight="normal"
//               color="gray.500"
//               fontSize="sm"
//               _hover={{ color: "gray.700", bg: "transparent" }}
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               Справочники
//               <Box as="span" ml="1">
//                 <FiChevronDown />
//               </Box>
//             </Button>
//             {menuOpen && (
//               <Box
//                 position="absolute"
//                 top="100%"
//                 left="0"
//                 bg="white"
//                 borderWidth="1px"
//                 borderColor="gray.200"
//                 borderRadius="md"
//                 shadow="lg"
//                 py="1"
//                 minW="150px"
//                 zIndex="dropdown"
//               >
//                 <Box
//                   px="4"
//                   py="2"
//                   fontSize="sm"
//                   cursor="pointer"
//                   _hover={{ bg: "gray.50" }}
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Пользователи
//                 </Box>
//                 <Box
//                   px="4"
//                   py="2"
//                   fontSize="sm"
//                   cursor="pointer"
//                   _hover={{ bg: "gray.50" }}
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Аптеки
//                 </Box>
//               </Box>
//             )}
//           </Box>
//         </Flex>

//         <Flex align="center" gap="4">
//           <Box position="relative">
//             <Box
//               w="32px"
//               h="32px"
//               borderRadius="full"
//               bg="orange.100"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               fontSize="xs"
//               fontWeight="medium"
//               color="orange.700"
//             >
//               АИ
//             </Box>
//             <Badge
//               position="absolute"
//               top="-2px"
//               right="-2px"
//               bg="green.500"
//               color="white"
//               borderRadius="full"
//               fontSize="xs"
//               minW="18px"
//               h="18px"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//             >
//               2
//             </Badge>
//           </Box>

//           <Button
//             variant="outline"
//             size="sm"
//             borderColor="gray.300"
//             color="gray.700"
//             fontWeight="normal"
//             _hover={{ bg: "gray.50" }}
//           >
//             <FiLogOut />
//             <Text ml="2">Выйти</Text>
//           </Button>
//         </Flex>
//       </Flex>
//     </Box>
//   );
// }
