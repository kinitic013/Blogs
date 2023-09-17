import React from 'react';
import App from "../components/App.jsx";
import { Box} from '@chakra-ui/react';

function Home() {
  return (
    
    <Box minH="100vh" className='page'bgGradient="linear(to-b,  #FFDBC3, #27005D)"   >
        <App className='home'/>
    </Box>
  );
}

export default Home;


