import { LongTxt } from '../book/long-text.jsx'
import { bookService } from '../../services/book-service/book.service.js'
import { eventBusService } from "../../services/book-service/event.bus.service.js"


import { ReviewBook } from './book-review.jsx'
import { ReviewList } from './book-review-list.jsx'
const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {

    state = {
        book: null,
        isLongTxtShown: false,
        bookReviews: null
    }

    componentDidMount() {
        const { book } = this.state
        this.loadBook()
        if (book) this.setState({ isLongTxtShown: (book.description.length > 100) })
    }

    loadBook = () => {
        let { bookId } = this.props.match.params
        bookService.getBookById(bookId)
            .then((book) => {
                if (!book) return this.props.history.push('/')
                this.setState({ book, bookReviews: book.reviews })
            })
    }

    getPageLength = (pages) => {
        if (pages > 500) return 'Long Reading'
        else if (pages > 200) return 'Decent Reading'
        else return 'Light Reading'
    }

    getBookSeniority = (years) => {
        if (years > 10) return 'Veteran Book'
        else if (years > 1) return 'Snior Book'
        else return 'New!'
    }


    getPriceAlert = (price) => {
        if (price > 150) return 'red'
        else if (price < 20) return 'green'
    }


    toggleLongTxtShown = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    onGoBack = () => {
        this.props.history.push('/book')
    }

    onAddReview = (bookReview) => {
        const { book } = this.state
        bookService.addReview(book.id, bookReview)
            .then(book => this.setState((prevState) => ({ ...prevState, bookReviews: book.reviews })))
        eventBusService.emit('user-msg', {
            type: 'success', txt: `The review has been added successfully`
        })
    }


    onRemoveReview = (reviewIdx) => {
        let { book } = this.state
        bookService.removeReview(reviewIdx, book.id)
            .then(book => this.setState((prevState) => ({ ...prevState, bookReviews: book.reviews })))
        eventBusService.emit('user-msg', {
            type: 'success', txt: `The review has been deleted successfully`
        })
    }


    render() {
        const { book, bookReviews } = this.state
        if (!book) return <img src="./assets/img/loader2.gif" />

        const { isOnSale } = book.listPrice
        const { amount } = book.listPrice
        const priceAlert = this.getPriceAlert(amount)
        const bookTime = new Date().getFullYear() - book.publishedDate
        const bookSeniority = this.getBookSeniority(bookTime)
        const pageCount = this.getPageLength(book.pageCount)
        let priceSymbol = book.listPrice.currencyCode === 'EUR' ? '€' : '$'
        const { isLongTxtShown } = this.state

        const nextBookId = bookService.getNextBookId(book.id)
        const prevBookId = bookService.getPrevBookId(book.id)

        return <section className="book-details">
            {isOnSale && <h1>On Sale! 🔥</h1>}
            <h2>Title: {book.title}</h2>
            <h3>Published Date: {book.publishedDate}</h3>
            <div>
                <img src={book.thumbnail} />
            </div>
            <p>Book Price: <span className={priceAlert}>{amount}{priceSymbol}</span></p>
            <p>Book Length: {pageCount}</p>
            <p>Book Seniority: {bookSeniority}</p>
            <p>Book language: {book.language}</p>
            <p>Subtitle: {book.subtitle}</p>
            {/* <p>Description: {book.description}</p> */}
            <LongTxt text={book.description} isLongTxtShown={isLongTxtShown}
                toggleLongTxtShown={this.toggleLongTxtShown} />
            <h3>Authors: {book.authors}</h3>


            <button onClick={this.onGoBack}>Back</button>



            <ReviewBook onAddReview={this.onAddReview} />
            <ReviewList onRemoveReview={this.onRemoveReview} bookReview={bookReviews} />


        </section>

    }

} 