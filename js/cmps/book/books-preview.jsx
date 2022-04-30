const { Link } = ReactRouterDOM

export function BookPreview({ book }) {
    let priceSymbol = book.listPrice.currencyCode === 'EUR' ? '€' : '$'


    return <Link to={`/book/${book.id}`}>
        <section className="book-preview" >
            <h3>Book Name: {book.title}</h3>
            <h3>Price: {book.listPrice.amount}{priceSymbol}</h3>
            <div className="img-container">
                <img src={book.thumbnail} />
            </div>
        </section>
    </Link>
}