import { FormControl, Input, InputRightElement, Button, InputGroup, Center, Box, Text } from "@chakra-ui/react";
import Header from "./Header";
import io from 'socket.io-client';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@chakra-ui/icons"
import axios from "axios";


const socket = io("http://localhost:5000");
function Room() {
    const params = useParams()
    const navigate = useNavigate()
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const room_id = params.id;

    useEffect(() => {
        axios.get(`http://localhost:5000/rooms/${room_id}`).catch(function (err) {
            if (err.response.status === 404) {
                navigate("/")
            }
        })
        axios.get(`http://localhost:5000/rooms/${room_id}/messages`).then(data => {
            setMessages(messages => [...messages, ...data.data.messages])
        })
    }, [])

    useEffect(() => {
        socket.on("message recieved", (message) => {
            setMessages(messages => [...messages, message])
        })
    }, [])



    socket.emit("join room", room_id)

    function sendToOthers(e) {
        e.preventDefault();
        if (message) {
            socket.emit("message sent", room_id, message)
        }
        setMessage("")
    }
    return (
        <div>
            <Header />
            <Center>
                <Box h={"md"} w={"70%"} overflowY={"scroll"}>
                    {messages.map((message, index) => {
                        return <Text key={index} _odd={{ bg: "blackAlpha.300" }} p={"2"} borderRadius={"md"}>{message}</Text>
                    })}
                </Box>
                <form onSubmit={sendToOthers} style={{ width: "70%", position: "fixed", bottom: "30px" }}>
                    <FormControl>
                        <InputGroup>
                            <Input w={"100%"} value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter your message"></Input>
                            <InputRightElement children={<Button colorScheme={"teal"}><ArrowRightIcon /></Button>} />
                        </InputGroup>
                    </FormControl>
                </form>
            </Center>
        </div >
    )
}

export default Room;