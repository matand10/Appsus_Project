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
                // this.unNotesPinned()
                this.setState({ notes }, this.unNotesPinned)
            })
    }


    onDelete = (noteId) => {
        noteService.deleteNote(noteId)
            .then(this.loadNotes)
    }

    onCreate = (note) => {
        noteService.createNote(note)
            .then(this.loadNotes)
    }

    onPin = (noteId) => {
        noteService.pinNote(noteId)
            .then(this.loadNotes)

    }

    unNotesPinned = () => {
        let unPinnedNotes = noteService.findUnpinnedNotes()
        this.setState({ unPinnedNotes })
    }

    onDuplicate = (noteId) => {
        noteService.duplicateNote(noteId)
            .then(this.loadNotes)
    }

    render() {
        const { notes, unPinnedNotes } = this.state

        return <section>
            <NoteInput onCreate={this.onCreate} />
            {notes.length === 0 && <h1>Your list is empty</h1>}
            {notes.length > 0 && <div>
                <PinnedNotes notes={notes} onDelete={this.onDelete} onPin={this.onPin} onDuplicate={this.onDuplicate} />
                <hr />
                <NoteList notes={unPinnedNotes} onDelete={this.onDelete} onPin={this.onPin} onDuplicate={this.onDuplicate} />
            </div>}
        </section>
    }
}
