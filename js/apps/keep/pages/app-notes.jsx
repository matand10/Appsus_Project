import { noteService } from '../services/note.service.js'


import { NoteInput } from '../cmps/note-input.jsx'
import { NoteList } from '../cmps/note-list.jsx'


export class NotesApp extends React.Component {

    state = {
        notes: []
    }


    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => this.setState({ notes }))
    }

    onDelete = (noteId) => {
        noteService.deleteNote(noteId)
            .then(notes => this.setState({ notes }))
    }

    onCreate = (note) => {
        noteService.createNote(note)
            .then(notes => this.setState({ notes }))
    }

    render() {
        const { notes } = this.state

        return <section>
            {notes.length > 0 && <div>
                <NoteInput onCreate={this.onCreate} />
                <NoteList notes={notes} onDelete={this.onDelete} />
            </div>}
        </section>
    }
}
