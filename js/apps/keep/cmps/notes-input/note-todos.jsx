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

    render() {
        const { note } = this.props
        const { label } = note.info
        const { todos } = this.state

        return <section className="note-todos" >
            <h1 suppressContentEditableWarning="true"
                contentEditable="true">{label}</h1>
            {todos.map((todo, idx) => <ul key={todo.txt} className={`todos-list`}>
                <li className={todo.doneAt ? 'mark' : ''} onClick={() => this.onMarkTodo(todo)}>{todo.txt}
                    <button onClick={() => this.onDeleteTask(idx, todos)} className="todo-btn" >❌</button>
                </li>
            </ul>)}
            {/* <button onClick={() => this.onEnterTask(todos)}>+</button> */}
        </section>

    }



}