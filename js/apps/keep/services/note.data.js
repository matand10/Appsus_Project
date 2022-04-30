import { utilService } from '../../../services/util.service.js'

export const noteData = {
    getNotes
}


function getNotes() {
    return [
        {
            id: utilService.makeId(),
            title: 'FullStack?',
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: '#E8C07D'
            }
        },
        {
            id: utilService.makeId(),
            title: 'Coding..',
            type: 'note-img',
            isPinned: false,
            info: {
                url: "https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
            },
            style: {
                backgroundColor: '#CC704B'
            }
        },
        {
            id: utilService.makeId(),
            title: 'My Video',
            type: "note-video",
            isPinned: false,
            info: { url: "https://www.youtube.com/embed?/doYvXHat8gU&list=RDdoYvXHat8gU&start_radio=1" },
            style: {
                backgroundColor: '#614124'
            }
        },
        {
            id: utilService.makeId(),
            title: 'My awesome dog🐶',
            type: 'note-img',
            isPinned: false,
            info: {
                url: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            },
            style: {
                backgroundColor: '#9FC088'
            }
        },
        {
            id: utilService.makeId(),
            title: 'Todos',
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
                backgroundColor: '#C6D57E'
            }
        },
        {
            id: utilService.makeId(),
            title: 'Groceries',
            type: "note-todos",
            isPinned: false,
            info: {
                todos: [
                    { txt: "Milk", doneAt: null },
                    { txt: "Eggs", doneAt: null },
                    { txt: "Water", doneAt: null },
                    { txt: "Bread", doneAt: null },
                    { txt: "Cookies", doneAt: null }
                ]
            },
            style: {
                backgroundColor: '#D57E7E'
            }
        },
        {
            id: utilService.makeId(),
            title: 'My Video',
            type: "note-video",
            isPinned: false,
            info: { url: "https://www.youtube.com/embed?/0G383538qzQ&list=RDdoYvXHat8gU&index=29" },
            style: {
                backgroundColor: '#A2CDCD'
            }
        },
        {
            id: utilService.makeId(),
            title: 'Pedro',
            type: "note-img",
            isPinned: false,
            info: { url: "../assets/imgs/animation.gif" },
            style: {
                backgroundColor: '#FFE1AF'
            }
        }
    ]
}