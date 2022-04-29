import { noteService } from '../../keep/services/note.service.js'

import { NoteText } from '../../keep/cmps/notes-input/note-text.jsx'
import { NoteImg } from '../../keep/cmps/notes-input/note-img.jsx'
import { NoteTodos } from '../../keep/cmps/notes-input/note-todos.jsx'
import { NoteVideo } from '../../keep/cmps/notes-input/note-video.jsx'




export class NotePreview extends React.Component {


    state = {
        type: this.props.note.type,
        isPinned: false,
        noteStyle: {
            backgroundColor: this.props.note.style.backgroundColor || 'lightbrown'
        }
    }

    onDeleteNote = (noteId) => {
        this.props.onDelete(noteId)
    }

    setColor = ({ target }) => {
        const { note } = this.props
        let value = target.value
        noteService.saveColor(note.id, value)
        this.setState((prevState) => ({ noteStyle: { ...prevState.noteStyle, backgroundColor: target.value } }))
    }

    onPinNote = (noteId) => {
        this.props.onPin(noteId)
    }

    onDuplicateNote(noteId) {
        this.props.onDuplicate(noteId)
    }

    addTask = (todos) => {
        console.log(todos);
    }

    dragStarted = (ev, note) => {
        ev.dataTransfer.setData('note', note.id)
    }

    draggingOver = (ev) => {
        ev.preventDefault()
    }

    dragDropped = (ev, noteDestination) => {
        let transferedNoteId = ev.dataTransfer.getData('note')
        this.props.onDragNote(transferedNoteId, noteDestination.id)
    }

    changeNoteText = (value, note) => {

        console.log(value, note);
    }


    render() {
        const { type, noteStyle } = this.state
        const { note } = this.props
        if (!type) return <h1>Loading...</h1>
        let isPinned = note.isPinned ? 'pinned' : 'not-pinned'

        return <section draggable onDrop={(ev) => this.dragDropped(ev, note)} onDragOver={(ev) => this.draggingOver(ev)} onDragStart={(ev) => this.dragStarted(ev, note)} className="note-preview" style={noteStyle}>
            {note && <DynamicCmp type={type} note={note} changeText={this.changeNoteText} />}
            <div className="btn-container">
                <img className={`note-btn ${isPinned}`} onClick={() => this.onPinNote(note.id)} src="../../../../assets/imgs/notes-imgs/pin.svg" />
                <img className="note-btn" onClick={() => this.onDuplicateNote(note.id)} src="../../../../assets/imgs/notes-imgs/clone.svg" />
                <img className="note-btn" src="../../../../assets/imgs/notes-imgs/color.svg" />
                <input type="color" onChange={this.setColor} className="color-input" />
                <img className="note-btn" src="../../../../assets/imgs/notes-imgs/mail.svg" />
                <img className="note-btn" onClick={() => this.onDeleteNote(note.id)} src="../../../../assets/imgs/notes-imgs/trash.svg" title="Delete" />
            </div>
        </section>
    }
}


function DynamicCmp({ type, note, changeText }) {
    switch (type) {
        case 'note-txt':
            return <NoteText note={note} changeText={changeText} />
        case 'note-img':
            return <NoteImg note={note} changeText={changeText} />
        case 'note-todos':
            return <NoteTodos note={note} />
        case 'note-video':
            return <NoteVideo note={note} />
    }
}