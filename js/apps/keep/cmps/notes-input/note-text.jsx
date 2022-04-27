

export class NoteText extends React.Component {

    state = {
        txt: '',
        backgroundColor: '',
        isPinned: false,
    }


    render() {
        const { note } = this.props

        return <section className="note-text">
            {note && <h1>{note.info.txt}</h1>}
        </section>
    }
}