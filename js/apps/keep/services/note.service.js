import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    query,
    createNote,
    getById,
    deleteNote
}

const NOTES_KEY = 'notesDB'
const gNotes = [
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    }
];

function query() {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = gNotes
        _saveToStorage(notes)
    }
    return Promise.resolve(notes)
}

function deleteNote(noteId) {
    let notes = _loadFromStorage()
    let note = notes.findIndex(note => noteId === note.id)
    notes.splice(note, 1)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function createNote(note) {
    let notes = _loadFromStorage()
    let newNote = createNewNote(note)
    notes.push(newNote)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function createNewNote(note) {
    return {
        id: utilService.makeId(),
        type: note.type,
        isPinned: note.isPinned,
        info: note.info
    }
}

function getById(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note)
}

function _saveToStorage(notes) {
    storageService.saveToStorage(NOTES_KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(NOTES_KEY)
}