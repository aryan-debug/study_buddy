import { Box, Center, FormControl, FormLabel, Heading, Input, Textarea, VStack, Select, Button, } from "@chakra-ui/react";
import { useState } from "react";
import { subjects } from "../subjects";
import io from 'socket.io-client';
import Header from "./Header";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const socket = io("http://localhost:5000");

function CreateRoomPage() {
    let navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [grade, setGrade] = useState("");
    const [subject, setSubject] = useState("");
    function create_room(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/create_room", { title, description, grade, subject })
        socket.on("url_created", (url) => navigate(url))
    }
    return (
        <Box>
            <Header />
            <Center>
                <VStack w="40%" gap={"4"}>
                    <Heading>Create Room</Heading>
                    <form style={{ width: "100%" }} onSubmit={create_room}>
                        <VStack gap={"4"}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input value={title} onChange={e => setTitle(e.target.value)} required />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea value={description} onChange={e => setDescription(e.target.value)} required />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Grade</FormLabel>
                                <Input value={grade} onChange={e => setGrade(e.target.value)} required />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Subject</FormLabel>
                                <Select value={subject} onChange={e => setSubject(e.target.value)} placeholder="Choose a subject">
                                    {
                                        subjects.map((subject, index) => { return <option key={index} value={subject}>{subject}</option> })
                                    }
                                </Select>
                            </FormControl>
                            <Button colorScheme={"teal"} size="lg" type="submit">Create</Button>
                        </VStack>
                    </form>
                </VStack>
            </Center>
        </Box >
    )
}

export default CreateRoomPage