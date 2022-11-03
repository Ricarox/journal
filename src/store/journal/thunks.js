import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewEmptyNote, setPhotosToActiveNote, setActiveNote, savingNewNote, setNotes, noteUpdated, setSaving, deleteNoteById, favoriteNote } from './';


export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote())
        const { uid } = getState().auth;


        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            favorite: false,
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notas`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;



        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));



    }
}

export const startLoadingNote = () => {
    return async (dispatch, getState) => {



        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');


        const notes = await loadNotes(uid);

        dispatch(setNotes(notes))
    }
}

export const startSavegNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(noteUpdated(note))

    }
}

export const startUploadinFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));

    }
}

export const StartDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));

    }
}
export const StartFavoriteNote = (x) => {
    return async (dispatch, getState) => {
        
        dispatch(setSaving());

        const { active: note } = getState().journal;

        const { uid } = getState().auth;

        {
            x
                ? x = false
                : x = true
        }
        const noteToFireStore = { ...note, favorite: x };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.id}`);

        await setDoc(docRef, noteToFireStore, { merge: true });
        dispatch(favoriteNote(noteToFireStore))


    }
}
