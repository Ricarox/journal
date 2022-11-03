import { createSlice } from '@reduxjs/toolkit';



export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrls: [],
        //     favorite: false,

        // }
    },
    reducers: {

        savingNewNote: (state) => {

            state.isSaving = true;


        },

        addNewEmptyNote: (state, action) => {

            state.notes.push(action.payload);
            state.isSaving = false;

        },

        setActiveNote: (state, action) => {

            state.active = action.payload;
            state.messageSaved = '';

        },

        setNotes: (state, action) => {

            state.notes = action.payload;


        },
        setSaving: (state) => {

            state.isSaving = true;
            state.messageSaved = '';

        },

        noteUpdated: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.filter(note => {

                if (note.id === action.payload.id) {
                    return action.payload;
                }

                return note;
            });

            state.messageSaved = `${action.payload.title}, actualizada correctamente.`;

        },

        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);


        },

        setPhotosToActiveNote: (state, action) => {
            if (!state.active.imageUrls) {
                state.active.imageUrls = []
            }
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;

        },

        claearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;

        },

        favoriteNote: (state, action) => {

            state.active = action.payload;
            state.isSaving = false;

            {
                action.payload.favorite

                    ? state.messageSaved = `${action.payload.title}, Agregado a favoritos.`

                    : state.messageSaved = `${action.payload.title}, Eliminado de favoritos.`;
            }


        },

    }
});


// Action creators are generated for each case reducer function
export const {

    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    noteUpdated,
    deleteNoteById,
    savingNewNote,
    setPhotosToActiveNote,
    claearNotesLogout,
    favoriteNote

} = journalSlice.actions;