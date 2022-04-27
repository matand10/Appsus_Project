import { storageService } from '../storage.service.js'
import { utilService } from '../util.service.js'

export const noteService = {

}

const NOTES_KEY = 'notesDB'
const notes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
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
        id: "n103",
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

function query(filterBy) {

}

function createNote() {

}


function _saveToStorage(cars) {
    storageService.saveToStorage(NOTES_KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(NOTES_KEY)
}

