

export function NoteImg({ note }) {

    const { url, title } = note.info
    return <section className="note-img">
        <img src={url} />
        <h1 suppressContentEditableWarning="true"
            contentEditable="true">{title}</h1>
    </section>

}