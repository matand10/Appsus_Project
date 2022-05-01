import { EmailDetails } from './email-details.jsx'
import { emailService } from '../../mail/services/email.service.js'

export class SentMailPreview extends React.Component {
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

    get setTime(){
        const {sentMail } = this.props
        let hours = new Date(sentMail.sentAt).getHours()
        let minutes = new Date(sentMail.sentAt).getMinutes()
        hours = (hours < 10) ? '0' + hours : hours
        minutes = (minutes < 10) ? '0' + minutes : minutes
        let outPut = hours + ':' + minutes
        return outPut
    }
    render() {
        const { sentMail } = this.props
        const { emailClicked, isClicked, isRead } = this.state
        let readImg = isRead ? 'open' : 'close'
        let time=this.setTime
        return <section className="email-preview">
            <tr className="user-mails" onClick={() => this.onClickEmail(sentMail.id)}>
                <td>{sentMail.from}</td>
                <td>{sentMail.subject}</td>
                <td><img src={`assets/imgs/notes-imgs/envelope-${readImg}.svg`} onClick={(event) => this.onClickRead(event, sentMail.id)} /></td>
                <td><img src="assets/imgs/notes-imgs/trash.svg" onClick={(event) => this.onRemove(event, sentMail.id)} /></td>
                <td>{time}</td>
            </tr>
            {isClicked && <EmailDetails email={emailClicked} />}
        </section>
    }
}