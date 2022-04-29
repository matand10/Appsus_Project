


export function NoteVideo({ note }) {



    return <section className="note-video">
        <iframe
            src={note.info.url}
            title="YouTube video player">
        </iframe>
    </section>

}

