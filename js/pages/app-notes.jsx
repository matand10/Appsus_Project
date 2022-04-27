import { NoteInput } from '../apps/keep/cmps/note-input.jsx'
import { NotePreview } from '../apps/keep/cmps/note-preview.jsx'


export class NotesApp extends React.Component {



    render() {
        return <section>
            <NoteInput />
            <NotePreview />
        </section>
    }
}
