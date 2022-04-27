import { noteService } from '../../keep/services/note.service.js'
import { NoteText } from '../../keep/cmps/notes-input/note-text.jsx'




export class NotePreview extends React.Component {


    state = {
        type: '',
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote() {
        let { note } = this.props
        this.setState({ type: note.type })
    }


    render() {
        const { note } = this.props
        if (!note) return <h1>Loading...</h1>

        return <section className="note-preview">
            <DynamicCmp type={note.type} note={note} />
            <div className="btn-container">
                <img className="note-btn" src="../../../../assets/imgs/notes-imgs/color.svg" />
                <img className="note-btn" src="../../../../assets/imgs/notes-imgs/mail.svg" />
                <img className="note-btn" src="../../../../assets/imgs/notes-imgs/pin.svg" />
                <img className="note-btn" src="../../../../assets/imgs/notes-imgs/trash.svg" />
            </div>
        </section>
    }
}


function DynamicCmp({ type, note }) {
    console.log(type);
    switch (type) {
        case 'note-txt':
            return <NoteText note={note} />
        case 'note-img':
            return <h1>Img</h1>
        case 'note-todos':
            return <h1>Todos</h1>
    }
}