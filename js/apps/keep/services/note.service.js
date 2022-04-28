import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    query,
    createNote,
    getById,
    deleteNote,
    removeTask,
    findPinnedNotes,
    findUnpinnedNotes,
    pinNote,
    duplicateNote
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
        isPinned: false,
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
        isPinned: false,
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

function findPinnedNotes() {
    let notes = _loadFromStorage()
    let pinnedNotes = notes.filter(note => note.isPinned)
    return Promise.resolve(pinnedNotes)
}

function findUnpinnedNotes() {
    let notes = _loadFromStorage()
    let unpinnedNotes = notes.filter(note => !note.isPinned)
    return unpinnedNotes
}

function removeTask(taskIdx, noteId) {
    let notes = _loadFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].info.todos.splice(taskIdx, 1)
    _saveToStorage(notes)
    let todos = notes[noteIdx].info.todos
    return Promise.resolve(todos)
}

function deleteNote(noteId) {
    let notes = _loadFromStorage()
    let noteIdx = notes.findIndex(note => noteId === note.id)
    notes.splice(noteIdx, 1)
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
        isPinned: false,
        info: note.info
    }
}

function duplicateNote(noteId) {
    const notes = _loadFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    let newNote = JSON.parse(JSON.stringify(notes[noteIdx]))
    newNote.id = utilService.makeId()
    notes.splice(noteIdx, 0, newNote)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function pinNote(noteId) {
    const notes = _loadFromStorage()
    const noteIdx = notes.findIndex(note => noteId === note.id)
    notes[noteIdx].isPinned = !notes[noteIdx].isPinned
    _saveToStorage(notes)
    return Promise.resolve(notes)
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