import { noteService } from '../services/note.service.js'


import { PinnedNotes } from '../cmps/notes-input/note-pin.jsx'
import { NoteInput } from '../cmps/note-input.jsx'
import { NoteList } from '../cmps/note-list.jsx'


export class NotesApp extends React.Component {

    state = {
        notes: [],
        unPinnedNotes: []
    }


    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => {
                this.unNotesPinned(notes)
                this.setState({ notes })
            })
    }

    onDelete = (noteId) => {
        noteService.deleteNote(noteId)
            .then(notes => this.setState({ notes }))
    }

    onCreate = (note) => {
        noteService.createNote(note)
            .then(notes => this.setState({ notes }))
    }

    onPin = (noteId) => {
        noteService.pinNote(noteId)
            .then(notes => this.setState({ notes }))
    }

    unNotesPinned = (notes) => {
        noteService.findUnpinnedNotes(notes)
            .then(notes => (prevState) => this.setState({ ...prevState, unPinnedNotes: notes }))
    }

    render() {
        const { notes, unPinnedNotes } = this.state

        return <section>
            {notes.length > 0 && <div>
                <NoteInput onCreate={this.onCreate} />
                <PinnedNotes notes={notes} onDelete={this.onDelete} />
                <hr />
                <NoteList notes={notes} onDelete={this.onDelete} onPin={this.onPin} />
            </div>}
        </section>
    }
}
