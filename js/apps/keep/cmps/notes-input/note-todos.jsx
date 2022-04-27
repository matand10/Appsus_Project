

export function NoteTodos({ note }) {

    const { title, label, todos } = note.info


    return <section className="note-todos">
        <h1>{title}</h1>
        <h1>{label}</h1>
        {todos.map(todo => <p className="todo" key={todo.txt}>
            {todo.txt} <button className="todo-btn" >❌</button>
        </p>)}
    </section>

}