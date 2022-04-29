import { eventBusService } from '../../../services/event-bus-service.js'
import { emailService } from '../../mail/services/email.service.js'
const { Link } = ReactRouterDOM
export class AddSendEmail extends React.Component {
state={
    newEmails:'',
    isSent:false
}
    onSend = (ev) => {
        ev.preventDefault()
        let valSubject = ev.target[1].value
        let valBody = ev.target[2].value
        emailService.addMail(valSubject, valBody)
            .then(newEmails => {
                console.log(newEmails)
                this.setState((prevState)=>({...prevState,newEmails}))
                // eventBusService.emit('new-emails', newEmails)
                this.props.history.push('/email')
            })
            .then(()=>{
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'Email sended successfully'
            })
        })
    }

    render() {
        return <section className="send-mail">
                <Link to="/email"><button>X</button></Link>
                <header>New message:</header>
            <form className="send" onSubmit={(event) => this.onSend(event)}>
                <label>To:
                    <input type="text" name="mailTo" />
                </label>
                <label>Subject:
                    <input type="text" name="subject" />
                </label>
                <label>Text:
                    <input type="textarea" name="body" />
                </label>
                <button><img src="assets/imgs/notes-imgs/send.svg"/></button>
            </form>
        </section>
    }
}