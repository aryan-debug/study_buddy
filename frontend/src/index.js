import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/Homepage';
import { ChakraProvider, ColorModeProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateRoomPage from './components/CreateRoomPage';
import Room from './components/Room';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/create_room' element={<CreateRoomPage />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ColorModeScript>
  </ChakraProvider>
);
