import { utilService } from '../../../../services/util.service.js'
import { noteService } from '../../services/note.service.js'

export class NoteTodos extends React.Component {


    state = {
        todos: []
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

    render() {
        const { note } = this.props
        const { label } = note.info
        const { todos } = this.state

        return <section className="note-todos">
            <h1>{label}</h1>
            {todos.map((todo, idx) => <p className="todo" key={todo.txt}>
                {todo.txt}
                <button onClick={() => this.onDeleteTask(idx, todos)} className="todo-btn" >❌</button>
            </p>)}
        </section>

    }



}