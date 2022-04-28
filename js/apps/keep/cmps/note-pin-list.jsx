import { NotePreview } from './note-preview.jsx'


export function PinnedList({ notes, onDelete, onPin, onDuplicate }) {
    return <section className="pinned-list">
        {notes.map(note => <NotePreview note={note} key={note.id} onDelete={onDelete} onPin={onPin} onDuplicate={onDuplicate} />)}
    </section>
}

