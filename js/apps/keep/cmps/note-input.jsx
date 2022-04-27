import { NoteText } from './notes-input/note-text.jsx'


export class NoteInput extends React.Component {

    state = {
        inputType: 'text'

    }

    handleTypeChange = ({ target }) => {
        this.setState({ inputType: target.value })
    }

    render() {
        const { inputType } = this.state

        return <section>
            <DynamicCmp type={inputType} />
        </section>
    }
}


function DynamicCmp(props) {
    switch (props.type) {
        case 'text':
            return <NoteText />
    }
}