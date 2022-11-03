import { useSelector } from 'react-redux';
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { SideBarItem } from './';




export const SideBar = ({ drawerWidht = 240 }) => {

    const { displayName } = useSelector(state => state.auth)

    const { notes } = useSelector(state => state.journal);

    const res = notes.filter(note => note.favorite)
    const res2 = notes.filter(note => !note.favorite)

   





    return (

        <Box 
            component='nav'
            sx={{ width: { sm: drawerWidht }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidht },
                    
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />


                
                <div className="accordion accordion-flush" id="accordionFavorite">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-Favorite" aria-expanded="false" aria-controls="flush-Favorite">
                                Favoritos
                            </button>
                        </h2>
                        <div id="flush-Favorite" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">

                                <List>


                                    {


                                        res.map(note => (

                                            <SideBarItem key={note.id} {...note} />
                                        ))


                                    }


                                </List>

                            </div>
                        </div>
                    </div>


                </div>

                <div className="accordion accordion-flush" id="accordionNote">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-Notes" aria-expanded="false" aria-controls="flush-Notes">
                                Notas
                            </button>
                        </h2>
                        <div id="flush-Notes" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">

                                <List>


                                    {


                                        res2.map(note => (

                                            <SideBarItem key={note.id} {...note} />
                                        ))


                                    }


                                </List>

                            </div>
                        </div>
                    </div>


                </div>




            </Drawer>

        </Box>
    )
}
