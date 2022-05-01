import { eventBusService } from '../../../services/event-bus-service.js'
import { emailService } from '../../mail/services/email.service.js'
const { Link } = ReactRouterDOM
export class AddSendEmail extends React.Component {
    state = {
        newEmails: '',
        isSent: false,
        subject: 'Hola',
        body: 'Hola'
    }

    componentDidMount() {
        eventBusService.on('note-to-email', (newEmail) => {
            this.setState((prevState) => ({ ...prevState, subject: newEmail.subject, body: newEmail.body }))
        })
    }

    onSend = (ev) => {
        ev.preventDefault()
        let valSubject = ev.target[1].value
        let valBody = ev.target[2].value
        emailService.addMail(valSubject, valBody)
            .then(newEmails => {
                this.setState((prevState) => ({ ...prevState, newEmails }))
                // eventBusService.emit('new-emails', newEmails)
                this.props.history.push('/email')
            })
            .then(() => {
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'Email sended successfully'
                })
            })
    }

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    render() {
        const { subject, body } = this.state

        return <section className="send-mail">
            <div className="send-mail-container">
                <header>New message:</header>
                <form className="send" onSubmit={(event) => this.onSend(event)}>
                    <div className="label-container">
                        <label></label>
                        <input type="text" name="mailTo" placeholder="To:"/>
                    </div>

                    <div className="label-container">
                        <label></label>
                        <input onChange={this.handleChange} value={subject} type="text" name="subject" placeholder="Subject:"/>
                    </div>

                    <div className="label-container">
                        <label></label>
                        <textarea onChange={this.handleChange} value={body} type="textarea" name="body" cols="30" rows="10" placeholder="Text:"></textarea>
                    </div>

                    <button className="submit-email-btn"><img src="assets/imgs/notes-imgs/send.svg" /></button>
                </form>
            </div>
            <Link to="/email"><button className="exit-mail">Close</button></Link>
        </section>
    }
}