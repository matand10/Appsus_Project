import { utilService } from '../../../services/util.service.js'
import { noteService } from '../../keep/services/note.service.js'


import { MainInput } from '../cmps/notes-input/note-main-input.jsx'

export class NoteInput extends React.Component {

    state = {
        note: {
            title: '',
            info: { txt: '' },
            isPinned: false,
            type: 'note-txt'
        },
        selectedType: 'note-txt',
        isInputClicked: false
    }

    inputRef = React.createRef()


    // componentDidMount() {
    //     this.inputRef.current.focus()
    // }

    handleTitleChange = ({ target }) => {
        const value = target.value
        this.setState((prevState) => ({ note: { ...prevState.note, title: value } }))
    }

    handleChange = ({ target }) => {
        const { info } = this.state.note
        const value = target.value
        const field = Object.keys(info)
        this.setState((prevState) => ({ note: { ...prevState.note, info: { [field]: value } } }))
    }

    setTodos = (note) => {
        let task = note.info.todos
        let todos = task.split(',')
        let tasks = todos.map(todo => ({ txt: todo, dontAt: null }))
        note.info.todos = tasks
    }

    createNote = (ev, note) => {
        ev.preventDefault()
        if (note.type === 'note-todos') this.setTodos(note)
        if (note.type === 'note-video') note.info.url = noteService.getYouTubeLink(note.info.url)
        this.props.onCreate(note)
        this.toggleInput(false)
    }

    onChangeType = (ev, num) => {
        ev.stopPropagation()
        switch (num) {
            case 1:
                return this.setState((prevState) => ({ selectedType: 'note-txt', note: { ...prevState.note, type: 'note-txt', info: { txt: '' } } }))
            case 2:
                return this.setState((prevState) => ({ selectedType: 'note-img', note: { ...prevState.note, type: 'note-img', info: { url: '' } } }))
            case 3:
                return this.setState((prevState) => ({ selectedType: 'note-todos', note: { ...prevState.note, type: 'note-todos', info: { todos: '' } } }))
            case 4:
                return this.setState((prevState) => ({ selectedType: 'note-video', note: { ...prevState.note, type: 'note-video', info: { url: '' } } }))
        }
    }

    get onSelectedType() {
        const { selectedType } = this.state
        switch (selectedType) {
            case 'note-txt':
                return 'txt'
            case 'note-img':
                return 'img'
            case 'note-todos':
                return 'todos'
            case 'note-video':
                return 'video'
        }
    }

    get onUserGuide() {
        const { selectedType } = this.state
        switch (selectedType) {
            case 'note-txt':
                return 'Type your text here..'
            case 'note-img':
                return 'Insert an image URL..'
            case 'note-todos':
                return 'Write your todos seperated by comma..'
            case 'note-video':
                return 'Insert a video URL..'
        }
    }


    toggleInput = (value) => {
        this.setState((prevState) => ({ ...prevState, isInputClicked: value }))
    }

    render() {
        const { note, selectedType, isInputClicked } = this.state
        let isSelected = this.onSelectedType
        let placeHolder = this.onUserGuide

        return <section className="note-input">
            <form onSubmit={(ev) => this.createNote(ev, note)} className="note-form" autoComplete="off">
                <div className="main-input-container">

                    {isInputClicked && <div className="input-container">
                        <input type="text" placeholder="Title" className="input title-input"
                            onChange={this.handleTitleChange} />
                    </div>}
                    <div className="input-container">
                        <input onClick={(ev) => this.toggleInput(true)} type="text" id="create-note" placeholder={placeHolder}
                            className="input text-input" onChange={this.handleChange} />
                    </div>
                    {isInputClicked && <div className="input-container imgs">
                        <label htmlFor="create-note" className="input-btn">
                            <img className={isSelected === 'txt' ? 'txt' : ''} onClick={(ev) => this.onChangeType(ev, 1)} src="assets/imgs/notes-input-imgs/text.svg" />
                            <img className={isSelected === 'img' ? 'img' : ''} onClick={(ev) => this.onChangeType(ev, 2)} src="assets/imgs/notes-input-imgs/image.svg" />
                            <img className={isSelected === 'todos' ? 'todos' : ''} onClick={(ev) => this.onChangeType(ev, 3)} src="assets/imgs/notes-input-imgs/list.svg" />
                            <img className={isSelected === 'video' ? 'video' : ''} onClick={(ev) => this.onChangeType(ev, 4)} src="assets/imgs/notes-input-imgs/video.svg" />
                        </label>
                    </div>}
                    <button hidden>Close</button>
                    {isInputClicked && <div onClick={() => this.toggleInput(false)} className="close">Close</div>}
                </div>
            </form>
        </section>
    }
}

