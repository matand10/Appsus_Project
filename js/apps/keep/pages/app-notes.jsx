import { noteService } from '../services/note.service.js'

import { eventBusService } from '../../../services/event-bus-service.js'
import { PinnedNotes } from '../cmps/notes-input/note-pin.jsx'
import { NoteInput } from '../cmps/note-input.jsx'
import { NoteList } from '../cmps/note-list.jsx'


export class NotesApp extends React.Component {

    state = {
        notes: [],
        filterBy: {}
    }
    removeEvent

    componentDidMount() {
        this.setFilter()
        this.loadNotes()
    }


    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(notes => {
                this.setState({ notes })
                eventBusService.on('filter-notes', notes)
            })
    }

    setFilter = () => {
        this.removeEvent = eventBusService.on('filter-notes', (filterBy) => {
            this.setState({ notes: filterBy })
        })
    }

    componentWillUnmount() {
        this.removeEvent()
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

    onDuplicate = (noteId) => {
        noteService.duplicateNote(noteId)
            .then(this.loadNotes)
    }

    onDragNote = (transferedNoteId, noteDestinationId) => {
        noteService.setNotePosition(transferedNoteId, noteDestinationId)
            .then(this.loadNotes)
    }

    saveText = (value, note) => {
        noteService.editText(value, note.id)
            .then(this.loadNotes)
    }


    render() {
        const { notes } = this.state

        return <section>
            <NoteInput onCreate={this.onCreate} />
            {notes.length === 0 && <h1>Your list is empty</h1>}
            <hr />
            {notes.length > 0 && <div>
                {/* <PinnedNotes notes={notes} onDelete={this.onDelete} onPin={this.onPin} onDuplicate={this.onDuplicate} /> */}
                <NoteList saveText={this.saveText} notes={notes} onDragNote={this.onDragNote} onDelete={this.onDelete} onPin={this.onPin} onDuplicate={this.onDuplicate} />
            </div>}
        </section>
    }
}
