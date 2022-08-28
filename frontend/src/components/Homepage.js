import { Box, Center, Grid, GridItem } from '@chakra-ui/react'
import Header from './Header';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from './RoomCard';

const socket = io("https://study-buddy-hacks.herokuapp.com");

function App() {
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    socket.on("room created", (room_info) => { setRooms(rooms => [...rooms, room_info]) })
  }, [])
  useEffect(() => {
    async function get_rooms() {
      const fetched_rooms = await axios.get("https://study-buddy-hacks.herokuapp.com/rooms");
      setRooms(rooms => [...rooms, ...fetched_rooms.data])
    }
    get_rooms()
  }, [])
  return (
    <Box>
      <Header />
      <Center>
        <Grid templateColumns={"repeat(3, 1fr)"} marginLeft="auto" gap={"16"} m={"10"}>
          {
            rooms.map((room) => {
              return (<GridItem key={room._id}>
                <RoomCard id={room._id} title={room.title} description={room.description} grade={room.grade} subject={room.subject} url={room._id} />
              </GridItem>)
            })
          }
        </Grid>
      </Center>
    </Box>
  );
}

export default App;
