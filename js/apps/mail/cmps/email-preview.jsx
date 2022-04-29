import { EmailDetails } from './email-details.jsx'
import { emailService } from '../../mail/services/email.service.js'

export class EmailPreview extends React.Component {
    state = {
        emailClicked: null,
        isClicked: false,
        isRead: false
    }

    onClickEmail = (emailId) => {
        const { isClicked } = this.state
        emailService.getEmailById(emailId)
            .then(email => {
                this.setState({ emailClicked: email, isClicked: !isClicked })
            })
    }
    onClickRead = (ev, emailId) => {
        ev.stopPropagation()
        const { isRead } = this.state
        emailService.getEmailById(emailId)
            .then(email => {
                emailService.updateKey(email.id, 'isRead')
                this.setState({ isRead: !isRead })
            })
    }

    onRemove = (ev, emailId) => {
        ev.stopPropagation()
        this.props.removeMail(emailId)
    }

    onNote = (email) => {
        this.props.getEmailToNote(email)
    }

    render() {
        const { email } = this.props
        const { emailClicked, isClicked, isRead } = this.state
        let readImg = isRead ? 'open' : 'close'
        return <section className="email-preview">
            <tr className="user-mails" onClick={() => this.onClickEmail(email.id)}>

                <td>{email.from}</td>
                <td>{email.subject}</td>
                <td><img src={`assets/imgs/notes-imgs/envelope-${readImg}.svg`} onClick={(event) => this.onClickRead(event, email.id)} /></td>
                <td><img src="assets/imgs/notes-imgs/trash.svg" onClick={(event) => this.onRemove(event, email.id)} /></td>
                <td><button onClick={() => this.onNote(email)}>Noted</button></td>
                <td>{new Date(email.sentAt).toLocaleTimeString('en-US')}</td>
            </tr>
            {isClicked && <EmailDetails email={emailClicked} />}

        </section>

    }
}

