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

    render() {
        const { notes } = this.state

        return <section>
            <NoteInput />
            <NoteList notes={notes} />
        </section>
    }
}
