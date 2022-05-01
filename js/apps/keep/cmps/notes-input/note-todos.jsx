import { utilService } from '../../../../services/util.service.js'
import { noteService } from '../../services/note.service.js'

export class NoteTodos extends React.Component {


    state = {
        todos: [],
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

    onEnterTask = (todos) => {
        this.props.addTask(todos)
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

    render() {
        const { note } = this.props
        const { todos } = this.state

        return <section className="note-todos">
            <h1 onBlur={(ev) => this.onChangeText(ev, note)} suppressContentEditableWarning="true"
                contentEditable="true">{note.title}</h1>
            <ul className="todos-list">
                {todos.map((todo, idx) => <li key={todo.txt} className={todo.doneAt ? 'mark' : ''} onClick={() => this.onMarkTodo(todo)}>
                    {todo.txt}
                    <button onClick={() => this.onDeleteTask(idx, todos)} className="todo-btn" >❌</button>
                </li>)}
            </ul>
            {/* <button onClick={() => this.onEnterTask(todos)}>+</button> */}
        </section>

    }
}