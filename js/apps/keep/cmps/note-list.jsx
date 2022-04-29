import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDelete, onPin, onDuplicate, onDragNote }) {
    return <section className="notes-list">
        {notes.map(note => <NotePreview note={note} key={note.id} onDelete={onDelete}
            onPin={onPin} onDuplicate={onDuplicate} onDragNote={onDragNote} />)}
    </section>
}