


export class ReviewList extends React.Component {


    onDeleteReview = (reviewIdx) => {
        this.props.onRemoveReview(reviewIdx)
    }

    render() {
        const { bookReview } = this.props
        if (!bookReview) return <h1>Be the first to review!</h1>

        return <section className="review-list">
            {bookReview.map((review, idx) => {
                return <section className="review" key={idx}>
                    <h3>{review.userName}</h3>
                    <h3>{review.rate}</h3>
                    <h3>{review.reviewDate}</h3>
                    <h3>{review.review}</h3>
                    <button onClick={() => this.onDeleteReview(idx)}>X</button>
                </section>
            })}
        </section>
    }
}