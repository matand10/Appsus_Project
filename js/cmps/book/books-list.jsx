import { BookPreview } from '../book/books-preview.jsx'

export function BookList({ books }) {
    return <section className="book-list">
        {books.map(book => <BookPreview book={book} key={book.id} />)}
    </section>
}