import { Box, Toolbar } from '@mui/material';
import { useState } from 'react';
import { NavBar, SideBar } from '../components';

const drawerWidht = 280;




export const JournalLayout = ({ children }) => {
  const [showToggle, setshowToggle] = useState(true)
  const onCloseToggle = () => {
    setshowToggle(!showToggle)
  }
  
  return (

    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>

        <NavBar drawerWidht = { drawerWidht } onCloseToggle= { onCloseToggle } showToggle= { showToggle } />

        <SideBar drawerWidht = { drawerWidht } onCloseToggle= { onCloseToggle } showToggle= { showToggle } />

        <Box
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />

            { children }

        </Box>
    </Box>

  )
}
