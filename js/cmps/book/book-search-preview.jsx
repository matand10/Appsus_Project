


export function BookSearchPreview({ resBooks, addNewBook, isOpen }) {


    const onAddBook = (book) => {
        addNewBook(book)
    }

    return <section className={`book-search-preview ${isOpen ? 'open' : ''}`}>
        <h1>Search Results</h1>
        <hr />
        {resBooks.map(book => <ul key={book.id}>
            <li>{book.volumeInfo.title} <button onClick={() => onAddBook(book)} className="add-searched-btn"><i className="fas fa-plus"></i></button></li>
        </ul>
        )}
    </section>
}