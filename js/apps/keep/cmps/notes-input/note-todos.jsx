import { utilService } from '../../../../services/util.service.js'
import { noteService } from '../../services/note.service.js'

export class NoteTodos extends React.Component {


    state = {
        todos: [],
        todoTxt: ''
    }

    componentDidMount() {
        const { todos } = this.props.note.info
        this.setState({ todos })
    }

    onDeleteTask = (idx) => {
        const { note } = this.props
        noteService.removeTask(idx, note.id)
            .then((todos) => this.setState({ todos }))
    }

    onAddTask = (ev) => {
        ev.preventDefault()
        const { todoTxt } = this.state
        const { note } = this.props
        noteService.addTask(todoTxt, note.id)
            .then((todos) => this.setState({ todoTxt: '', todos }))
    }

    onMarkTodo = (todo) => {
        noteService.markTodo(todo)
        const { todos } = this.props.note.info
        this.setState({ todos })
    }

    onChangeText = (ev, note) => {
        let value = ev.target.innerText
        this.props.changeText(value, note)
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState({ todoTxt: value })
    }

    render() {
        const { note } = this.props
        const { todos, todoTxt } = this.state

        return <section className="note-todos">
            <h1 onBlur={(ev) => this.onChangeText(ev, note)} suppressContentEditableWarning="true"
                contentEditable="true">{note.title}</h1>
            <ul className="todos-list">
                {todos.map((todo, idx) => <li key={idx} className={todo.doneAt ? 'mark' : ''} onClick={() => this.onMarkTodo(todo)}>
                    {todo.txt}
                    <button onClick={() => this.onDeleteTask(idx, todos)} className="todo-btn" >❌</button>
                </li>)}
            </ul>
            <div className="add-task-form">
                <form onSubmit={(ev) => this.onAddTask(ev)} autoComplete="off">
                    <label htmlFor="todo"></label>
                    <input value={todoTxt} type="text" id="todo" onChange={(ev) => this.handleChange(ev)} />
                </form>
            </div>
        </section>

    }
}