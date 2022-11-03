import { useDispatch } from 'react-redux';
import { MenuOutlined, LogoutOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { startLogout } from '../../store/auth';



export const NavBar = ({ drawerWidht = 240, onCloseToggle, showToggle  }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch( startLogout() );
    }

    

    const onToggle = () =>{
        onCloseToggle()
    }
    
    

  return (
    <AppBar 
        position="fixed"
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidht }px)` },
            ml: { sm: `${ drawerWidht }` }
         }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    onClick={onToggle}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between'>
                    <Typography variant='h6'noWrap component='div' alignItems='center' >JournalApp</Typography>

                    <IconButton 
                        color='error'
                        onClick={ onLogout }
                    >
                        <LogoutOutlined />
                    </IconButton>

                </Grid>

            </Toolbar>
    </AppBar>
  )
}
