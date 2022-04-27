import { utilService } from '../../../services/util.service.js'


export class NoteInput extends React.Component {

    state = {
        note: {
            info: { txt: '' },
            isPinned: false,
            type: 'note-txt'
        },
    }

    inputRef = React.createRef()


    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        const value = target.value
        // const field = target.name
        this.setState((prevState) => ({ note: { ...prevState.note, info: { txt: value } } }))
    }

    createNote = (ev, note) => {
        ev.preventDefault()
        this.props.onCreate(note)
    }



    render() {
        const { note } = this.state

        return <section className="note-input">
            <form onSubmit={(ev) => this.createNote(ev, note)}>
                <label htmlFor="create-note"></label>
                <input type="text" id="create-note" placeholder="What's on your mind?"
                    onChange={this.handleChange} ref={this.inputRef} />
            </form>
        </section>
    }
}

