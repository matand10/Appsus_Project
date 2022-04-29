

export function NoteText({ note, changeText }) {



    const onChangeText = (ev, note) => {
        let value = ev.target.innerText
        changeText(value, note)
    }



    return <section className="note-text">
        {note && <div className="note-text-container">
            <h1 onBlur={(ev) => onChangeText(ev, note)} suppressContentEditableWarning="true"
                contentEditable="true">{note.title}</h1>
            <p onBlur={(ev) => onChangeText(ev, note)} suppressContentEditableWarning="true"
                contentEditable="true">{note.info.txt}</p>
        </div>}
    </section>

}