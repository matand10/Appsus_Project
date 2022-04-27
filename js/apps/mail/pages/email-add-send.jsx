import { eventBusService } from '../../../services/event-bus-service.js'
import { emailService } from '../../mail/services/email.service.js'
const { Link } = ReactRouterDOM
export class AddSendEmail extends React.Component {

    onSend = (ev) => {
        ev.preventDefault()
        let valSubject = ev.target[1].value
        let valBody = ev.target[2].value
        emailService.addMail(valSubject, valBody)
            .then(newEmails => {
                eventBusService.emit('new-emails', newEmails)
            })
    }

    render() {
        return <section className="send-mail">
            <form onSubmit={(event) => this.onSend(event)}>
                <label>To:
                    <input type="text" name="mailTo" />
                </label>
                <label>Subject:
                    <input type="text" name="subject" />
                </label>
                <label>Text:
                    <input type="textarea" name="body" />
                </label>
                <Link to="/email"><button>Send</button></Link>
                <Link to="/email"><button>X</button></Link>
            </form>
        </section>
    }
}