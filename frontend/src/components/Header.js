import { Flex, Box, Heading, Spacer, Button, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

function Header() {
    return (
        <Flex m={"10"} fontSize="xl">
            <Box>
                <Heading size="lg">
                    <ReactLink to={"/"}>
                        Study Buddy
                    </ReactLink>
                </Heading>
            </Box>
            <Spacer />
            <Flex color={"teal.200"} gap="8" alignItems={"center"}>
                <Link as={ReactLink} to="/create_room">
                    <Button colorScheme={"teal"} variant={"solid"} fontWeight="bold" fontSize={"xl"}>
                        Create Room
                    </Button>
                </Link>
            </Flex>
        </Flex>)
}


export default Header