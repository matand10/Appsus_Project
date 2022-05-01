import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { noteData } from '../services/note.data.js'

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
    editText,
    createNotedEmail,
    addTask
}



const NOTES_KEY = 'notesDB'
const gNotes = noteData.getNotes();

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

function createNotedEmail(email) {
    let notes = _loadFromStorage()
    if (!notes) notes = noteData.getNotes();
    let note = _setEmailToNote(email)
    notes.push(note)
    _saveToStorage(notes)
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

function addTask(task, noteId) {
    let notes = _loadFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    let newTask = makeTodo(task)
    notes[noteIdx].info.todos.push(newTask)
    let todos = notes[noteIdx].info.todos
    _saveToStorage(notes)
    return Promise.resolve(todos)
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

function _setEmailToNote(email) {
    return {
        id: email.id,
        title: email.subject,
        type: 'note-txt',
        isPinned: false,
        info: { txt: email.body },
        style: {
            backgroundColor: "pink"
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

function makeTodo(task) {
    return {
        txt: task,
        doneAt: null
    }
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