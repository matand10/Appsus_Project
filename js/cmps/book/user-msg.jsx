import { eventBusService } from "../services/event.bus.service.js"

export class UserMsg extends React.Component {

    state = {
        msg: null,
        bookId: ''
    }

    removeEvent;
    timeoutId;

    componentDidMount() {
        this.removeEvent = eventBusService.on('user-msg', (msg) => {
            this.setState({ msg })
            if (this.timeoutId) clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(this.onCloseMsg, 3000)
        })
        this.removeEvent = eventBusService.on('book-id', (bookId) => {
            this.setState({ bookId })
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    onCloseMsg = () => {
        this.setState({ msg: null })
        clearTimeout(this.timeoutId)
    }

    render() {
        const { msg, bookId } = this.state

        let isShown = msg ? 'shown' : ''
        if (!msg) return <React.Fragment></React.Fragment>
        return <div className={`user-msg ${msg.type} ${isShown}`}>
            <button className="exit-modal" onClick={this.onCloseMsg}><i className="fas fa-times"></i></button>
            {msg.txt}
            <br />
            <br />
            {bookId && <a href={`/#/book/${bookId}`}>Check it Out</a>}
        </div>
    }
}