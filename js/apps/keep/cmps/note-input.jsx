import { utilService } from '../../../services/util.service.js'
import { noteService } from '../../keep/services/note.service.js'

export class NoteInput extends React.Component {

    state = {
        note: {
            title: '',
            info: { txt: '' },
            isPinned: false,
            type: 'note-txt'
        },
        selectedType: 'note-txt'
    }

    inputRef = React.createRef()


    componentDidMount() {
        this.inputRef.current.focus()
    }

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


    render() {
        const { note, selectedType } = this.state
        let isSelected = this.onSelectedType
        let placeHolder = this.onUserGuide

        return <section className="note-input">
            <input type="text" placeholder="Give me a title.." className="title-input"
                onChange={this.handleTitleChange} ref={this.inputRef} />
            <form onSubmit={(ev) => this.createNote(ev, note)} className="form">
                <div className="input-imgs">
                    <div className="input-btn-container">
                        <label htmlFor="create-note" className="input-btn">
                            <img className={isSelected = selectedType === 'note-txt' ? 'txt' : ''} onClick={(ev) => this.onChangeType(ev, 1)} src="../../../../assets/imgs/notes-input-imgs/text.svg" />
                            <img className={isSelected = selectedType === 'note-img' ? 'img' : ''} onClick={(ev) => this.onChangeType(ev, 2)} src="../../../../assets/imgs/notes-input-imgs/image.svg" />
                            <img className={isSelected = selectedType === 'note-todos' ? 'todos' : ''} onClick={(ev) => this.onChangeType(ev, 3)} src="../../../../assets/imgs/notes-input-imgs/list.svg" />
                            <img className={isSelected = selectedType === 'note-video' ? 'video' : ''} onClick={(ev) => this.onChangeType(ev, 4)} src="../../../../assets/imgs/notes-input-imgs/video.svg" />
                        </label>
                    </div>
                    <div>
                        <input type="text" id="create-note" placeholder={placeHolder}
                            onChange={this.handleChange} />
                    </div>
                </div>
            </form>

        </section>
    }
}

