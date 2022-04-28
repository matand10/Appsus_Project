

export function NoteImg({ note }) {

    const { url, title } = note.info
    return <section className="note-img">
        <h1 suppressContentEditableWarning="true"
            contentEditable="true">{title}</h1>
        <img src={url} />
    </section>

}