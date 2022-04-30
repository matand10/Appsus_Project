
export function LongTxt({ text, isLongTxtShown, toggleLongTxtShown }) {

    let txt = isLongTxtShown ? text.substring(0, 100) + '...' : text
    let toggle = isLongTxtShown ? 'show more' : 'show less'
    let isButtonShown = text.length > 100


    return <section className="long-text">
        <p>Description: {txt} {isButtonShown && <button onClick={toggleLongTxtShown}>{toggle}</button>}</p>

    </section>
}

