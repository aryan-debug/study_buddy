import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/Homepage';
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateRoomPage from './components/CreateRoomPage';
import Room from './components/Room';


localStorage.setItem("chakra-ui-color-mode", "dark")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme} colorModeManager={localStorage}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/create_room' element={<CreateRoomPage />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>

  </ChakraProvider>
);
