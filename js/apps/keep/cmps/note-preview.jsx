import { noteService } from '../../keep/services/note.service.js'

import { NoteText } from '../../keep/cmps/notes-input/note-text.jsx'
import { NoteImg } from '../../keep/cmps/notes-input/note-img.jsx'
import { NoteTodos } from '../../keep/cmps/notes-input/note-todos.jsx'




export class NotePreview extends React.Component {


    state = {
        type: this.props.note.type,
        isPinned: false,
        noteStyle: {
            backgroundColor: 'lightbrown'
        }
    }

    // componentDidMount() {
    //     this.loadNote()
    // }

    // loadNote() {s
    //     let { note } = this.props
    //     this.setState({ type: note.type })
    // }



    onDeleteNote = (noteId) => {
        this.props.onDelete(noteId)
    }

    setColor = ({ target }) => {
        this.setState((prevState) => ({ noteStyle: { ...prevState.noteStyle, backgroundColor: target.value } }))
    }

    onPinNote = (noteId) => {
        this.props.onPin(noteId)
    }

    onDuplicateNote(noteId) {
        this.props.onDuplicate(noteId)
    }



    render() {
        const { type, noteStyle } = this.state
        const { note } = this.props
        if (!type) return <h1>Loading...</h1>

        return <section className="note-preview" style={noteStyle}>
            {note && <DynamicCmp type={type} note={note} />}
            <div className="btn-container">
                <img className="note-btn" onClick={() => this.onDuplicateNote(note.id)} src="../../../../assets/imgs/notes-imgs/clone.svg" />
                <img className="note-btn" onClick={() => this.onPinNote(note.id)} src="../../../../assets/imgs/notes-imgs/pin.svg" />
                <img className="note-btn" onClick={() => this.onChangeColor(note.id)} src="../../../../assets/imgs/notes-imgs/color.svg" />
                <input type="color" onChange={this.setColor} className="color-input" />
                <img className="note-btn" src="../../../../assets/imgs/notes-imgs/mail.svg" />
                <img className="note-btn" onClick={() => this.onDeleteNote(note.id)} src="../../../../assets/imgs/notes-imgs/trash.svg" title="Delete" />
            </div>
        </section>
    }
}


function DynamicCmp({ type, note }) {
    switch (type) {
        case 'note-txt':
            return <NoteText note={note} />
        case 'note-img':
            return <NoteImg note={note} />
        case 'note-todos':
            return <NoteTodos note={note} />
    }
}