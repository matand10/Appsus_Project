

export class ReviewBook extends React.Component {

    state = {
        userName: 'Book\'s Reader',
        rate: 0,
        reviewDate: '',
        review: ''
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }


    onSaveReview = (ev) => {
        ev.preventDefault()
        let bookReview = this.state
        this.props.onAddReview(bookReview)
    }


    render() {
        const { userName, rate, reviewDate, review } = this.state

        // console.log(reviewDate.split('-').reverse().join('/'));
        return <section className="review-book">
            <form onSubmit={this.onSaveReview}>
                <div>
                    <label htmlFor="userName">Name</label>
                    <input type="text" placeholder="Your name..." id="userName" name="userName" value={userName}
                        onChange={this.handleChange} />
                </div>

                <div>
                    <label htmlFor="rate">Rate</label>
                    <input type="range" min="0" max="5" id="rate" name="rate" value={rate}
                        onChange={this.handleChange} />
                </div>

                <div>
                    <label htmlFor="reviewDate">Date Review</label>
                    <input type="date" id="reviewDate" name="reviewDate" value={reviewDate}
                        onChange={this.handleChange} />
                </div>

                <div className="review-content">
                    <label htmlFor="review">Your Opinion</label>
                    <textarea type="text" id="review" name="review" rows="4" cols="50" placeholder="Your text..."
                        value={review} onChange={this.handleChange}>
                    </textarea>
                </div>



                <button>Send Your Review</button>
            </form>
        </section>
    }
} 