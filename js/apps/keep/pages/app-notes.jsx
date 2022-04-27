import { NoteInput } from '../cmps/note-input.jsx'
import { NotePreview } from '../cmps/note-preview.jsx'


export class NotesApp extends React.Component {



    render() {
        return <section>
            <NoteInput />
            <NotePreview />
        </section>
    }
}
