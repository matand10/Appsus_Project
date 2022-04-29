

export function NoteImg({ note, changeText }) {


    const onChangeText = (ev, note) => {
        let value = ev.target.innerText
        changeText(value, note)
    }



    const { url, title } = note.info
    return <section className="note-img">
        <img src={url} />
        <h1 onBlur={(ev) => onChangeText(ev, note)} suppressContentEditableWarning="true"
            contentEditable="true">{title}</h1>
    </section>

}