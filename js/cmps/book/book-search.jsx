import { bookApiService } from "../../services/book-service/books.api.service.js"

import { BookSearchPreview } from "../book/book-search-preview.jsx"



export class BookSearch extends React.Component {

    state = {
        bookName: '',
        resBooks: [],
        isOpen: false
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState({ bookName: value })
    }

    onSearch = (ev) => {
        ev.preventDefault()
        let bookName = this.state
        bookApiService.getBooksFromApi(bookName)
            .then(results => {
                let books = results.items
                this.setState((prevState) => ({ ...prevState, resBooks: books }))
            })
        this.toggleSearch()
    }


    toggleSearch = () => {
        let { isOpen } = this.state
        this.setState({ isOpen: !isOpen })
    }

    render() {
        const { resBooks, isOpen } = this.state
        const { books, addNewBook } = this.props

        return <section className="book-search">
            <form onSubmit={this.onSearch}>
                <label htmlFor="by-search"></label>
                <input type="text" id="by-search" placeholder="search a book"
                    onChange={this.handleChange} />

                <button>Go Search</button>
            </form>

            <BookSearchPreview addNewBook={addNewBook} isOpen={isOpen} myBooks={books} resBooks={resBooks} />
        </section>
    }
}