import { noteService } from '../../keep/services/note.service.js'


export class NotePreview extends React.Component {


    state = {
        type: '',
        info: null
    }

    componentDidMount() {

    }

    loadNote() {
        let { note } = this.props
        // this.setState((prevState) => )
    }


    render() {
        const { note } = this.props
        console.log(note);

        return <section className="note-preview">
            <h1>{note.info.txt}</h1>
        </section>
    }
}