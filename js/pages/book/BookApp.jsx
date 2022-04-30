import { bookService } from '../../services/book-service/book.service.js'
import { eventBusService } from "../../services/book-service/event.bus.service.js"


import { BookList } from '../../cmps/book/books-list.jsx'
import { BookFilter } from '../../cmps/book/books-filter.jsx'
import { BookSearch } from '../../cmps/book/book-search.jsx'

const { Link } = ReactRouterDOM


export class BookApp extends React.Component {
    state = {
        books: [],
        filterBy: null,
    }

    componentDidMount() {
        setTimeout(this.loadBooks, 1000)
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => {
                return this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    addNewBook = (googleBook) => {
        bookService.addGoogleBook(googleBook)
            .then(books => {
                return this.setState({ books })
            })
        eventBusService.emit('book-id', googleBook.id)
        eventBusService.emit('user-msg', {
            type: 'success', txt: `The ${googleBook.volumeInfo.title} has been added successfully`
        })
    }


    render() {
        const { books } = this.state
        if (!books.length) return <img className="loader" src="./assets/imgs/miss-books/loader2.gif" />

        return (
            <section className="book-app">
                <React.Fragment>
                    <BookSearch addNewBook={this.addNewBook} books={books} />
                    <BookFilter onSetFilter={this.onSetFilter} />
                    <BookList books={books} />
                </React.Fragment>

            </section>
        )
    }
}