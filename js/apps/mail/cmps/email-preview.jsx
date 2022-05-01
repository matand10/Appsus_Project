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
        emailService.updateKey(emailId, 'isRead')
            .then((updateEmails) => {
                this.props.updateRead(updateEmails)
                this.setState({ isRead: !isRead })
            })
    
    }

    onRemove = (ev, emailId) => {
        ev.stopPropagation()
        this.props.removeMail(emailId)
    }

    onNote = (ev,email) => {
        ev.stopPropagation()
        this.props.getEmailToNote(email)
    }

    get setTime() {
        const { email } = this.props
        let hours = new Date(email.sentAt).getHours()
        let minutes = new Date(email.sentAt).getMinutes()
        hours = (hours < 10) ? '0' + hours : hours
        minutes = (minutes < 10) ? '0' + minutes : minutes
        let outPut = hours + ':' + minutes
        return outPut
    }

    render() {
        const { email } = this.props
        const { emailClicked, isClicked, realTime } = this.state
        let readImg = email.isRead ? 'open' : 'close'
        let readTitle = email.isRead ? 'Unread' : 'Read'
        let time = this.setTime
        return <section className="email-preview">
            <tr className="user-mails" onClick={() => this.onClickEmail(email.id)}>

                <td className={readTitle}>{email.from}</td>
                <td className={readTitle}>{email.subject}</td>
                <td><img src={`assets/imgs/notes-imgs/envelope-${readImg}.svg`} onClick={(event) => this.onClickRead(event, email.id)} title={`${readTitle} email`} /></td>
                <td><img src="assets/imgs/notes-imgs/trash.svg" onClick={(event) => this.onRemove(event, email.id)} title="Delete email" /></td>
                <td><button onClick={(event) => this.onNote(event,email)}><img src="assets/imgs/notes-imgs/email-to-note.svg" title="Send email to your note" /></button></td>
                <td className={readTitle}>{time}</td>
            </tr>
                {isClicked && <EmailDetails email={emailClicked} />}
        </section>

    }
}

