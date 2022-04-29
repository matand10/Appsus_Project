import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    query,
    createNote,
    getById,
    deleteNote,
    removeTask,
    pinNote,
    duplicateNote,
    markTodo,
    saveColor,
    setNotePosition,
    getYouTubeLink,
    editText
}



const NOTES_KEY = 'notesDB'
const gNotes = [
    {
        id: utilService.makeId(),
        title: 'My time',
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "lightbrown"
        }
    },
    {
        id: utilService.makeId(),
        title: 'My time',
        type: 'note-img',
        isPinned: false,
        info: {
            url: "https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "lightbrown"
        }
    },
    {
        id: utilService.makeId(),
        title: 'My time',
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: "lightbrown"
        }
    }
];

function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = gNotes
        _saveToStorage(notes)
    }

    if (Object.keys(filterBy).length) {
        let { subject } = filterBy
        notes = notes.filter(note => note.type.includes(subject))
    }

    return Promise.resolve(notes)
}

function setNotePosition(fromNoteId, toNoteId) {
    let notes = _loadFromStorage()
    let currNote = notes.find(note => note.id === fromNoteId)
    let fromNoteIdx = notes.findIndex(note => note.id === fromNoteId)
    let toNoteIdx = notes.findIndex(note => note.id === toNoteId)
    notes.splice(fromNoteIdx, 1)
    notes.splice(toNoteIdx, 0, currNote)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function saveColor(noteId, color) {
    let notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    note.style.backgroundColor = color
    _saveToStorage(notes)
}

function editText(value, noteId) {
    let notes = _loadFromStorage()
    let note = notes.find(note => note.id === noteId)
    console.log(note);
    switch (note.type) {
        case 'note-img':
            note.info.title = value
            break;
        case 'note-txt':
            note.info.txt = value
            break;
        case 'note-todos':
            note.info.label = value
            break;
    }
    _saveToStorage(notes)
    return Promise.resolve(notes)
}


function removeTask(taskIdx, noteId) {
    let notes = _loadFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].info.todos.splice(taskIdx, 1)
    _saveToStorage(notes)
    let todos = notes[noteIdx].info.todos
    return Promise.resolve(todos)
}

function markTodo(todo) {
    if (todo.doneAt) todo.doneAt = null
    else todo.doneAt = Date.now()
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
        title: note.title,
        type: note.type,
        isPinned: false,
        info: note.info,
        style: {
            backgroundColor: "lightbrown"
        }
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
    if (!notes[noteIdx].isPinned) {
        let currNote = notes.splice(noteIdx, 1)
        currNote.id = utilService.makeId()
        notes.splice(notes.length, 0, currNote[0])
    }
    let currNote = notes.splice(noteIdx, 1)
    currNote.id = utilService.makeId()
    notes.splice(0, 0, currNote[0])
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function getById(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note)
}

function getYouTubeLink(input) {
    let newInput = input.replace('watch?v=', 'embed?/')
    return newInput
}

function _saveToStorage(notes) {
    storageService.saveToStorage(NOTES_KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(NOTES_KEY)
}