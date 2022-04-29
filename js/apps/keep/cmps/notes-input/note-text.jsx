

export function NoteText({ note }) {




    return <section className="note-text">
        {note && <div className="note-text-container" suppressContentEditableWarning="true"
            contentEditable="true">
            <h1>Note</h1>
            <p>{note.info.txt}</p>
        </div>}
    </section>

}