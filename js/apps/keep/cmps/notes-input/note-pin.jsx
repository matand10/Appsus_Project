import { noteService } from '../../services/note.service.js'
import { PinnedList } from '../note-pin-list.jsx'


export class PinnedNotes extends React.Component {

    state = {
        notes: []
    }

    componentDidMount() {
        this.loadPinNotes()
    }

    loadPinNotes = () => {
        const { notes } = this.props
        noteService.findPinnedNotes(notes)
            .then(PinnedNotes => this.setState({ notes: PinnedNotes }))
    }


    render() {
        const { notes } = this.state
        return <section className="pin-notes">
            <PinnedList notes={notes} onDelete={this.props.onDelete} />
        </section>
    }
}