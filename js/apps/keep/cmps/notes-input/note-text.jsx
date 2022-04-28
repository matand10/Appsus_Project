

export function NoteText({ note }) {


    return <section className="note-text">
        {note && <div suppressContentEditableWarning="true"
            contentEditable="true">
            <h1>Note</h1>
            <h1>{note.info.txt}</h1>
        </div>}
    </section>

}