import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { TurnedInNot } from '@mui/icons-material';
import { Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { setActiveNote, StartFavoriteNote, startLoadingNote } from '../../store/journal';




export const SideBarItem = ({ title = '', body, id, date, imageUrls = [], favorite }) => {

    const { active: note, isSaving } = useSelector(state => state.journal);

    const dispatch = useDispatch();



    const onClickNote = () => {
        dispatch(setActiveNote({
            id,
            title,
            body,
            date,
            imageUrls,
            favorite
        }))
    }

    const onFavorite = () => {

        onClickNote()
        //console.log(favorite);
        dispatch(StartFavoriteNote(favorite))


    }



    useEffect(() => {

        dispatch(startLoadingNote())


    }, [isSaving])


    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title

    }, [title])

    return (

        <>



            <ListItem disablePadding >
                <IconButton  onClick={onFavorite}>
                    <ListItemIcon>
                        <TurnedInNot color={favorite ? 'favorite' : ''} />
                    </ListItemIcon>

                </IconButton>
                
                <ListItemButton onClick={onClickNote}>

                    <Grid container>
                        <ListItemText primary={newTitle} />
                        <ListItemText secondary={body} />

                    </Grid>
                </ListItemButton>
            </ListItem>


        </>
    )


}
