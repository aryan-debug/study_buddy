import { Box, Badge, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function RoomCard({ title, description, grade, subject, url }) {
    return (
        <Flex flexDirection={"column"} gap="3" bgColor={"gray.700"} p={"5"} w="xs" borderRadius={"md"}>
            <Heading textAlign={"center"}>{title}</Heading>
            <Text>{description}</Text>
            <Text>Grade: {grade}</Text>
            <Badge colorScheme={"teal"} variant={"outline"} w="fit-content">{subject}</Badge>
            <Box marginLeft={"auto"} marginRight={"auto"}><Link to={`/rooms/${url}`}><Button variant={"solid"} colorScheme={"teal"} fontWeight={"bold"} size="lg">Join</Button></Link></Box>
        </Flex >)
}
export default RoomCard;