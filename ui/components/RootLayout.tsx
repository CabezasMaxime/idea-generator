import { Box, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function RootLayout({children}: {children: ReactNode}) {
    return (
        <Box display="flex" flexDirection="column" w="100%" minH="100vh" alignItems="center" bg="linear-gradient(rgba(255, 255, 255, 1), rgba(100, 100, 100, 0.2))">
            <Heading as="h1" fontSize="55px"><i>.: Idea Generator :.</i></Heading>
            <Box flex="1" w="80%">
                {children}
            </Box>
            <Box position="relative" w="100%" h="40px" bg="linear-gradient(transparent, rgba(100, 100, 100, 0.3))">
                <Text position="absolute" fontSize="10px" textAlign="center" left="50%" transform="translateX(-50%)" bottom="10px" fontWeight="bold"><i>necromosis for @RageTalent</i></Text>
            </Box>
        </Box>
    )
}