import { EmailDetails } from '../../mail/pages/email-detail.jsx'
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
    onClickRead = (ev,emailId) => {
        ev.stopPropagation()
        const { isRead } = this.state
        emailService.getEmailById(emailId)
            .then(email => {
                email.isRead = 'true'
                this.setState({ isRead: !isRead })
            })
    }
    
    render() {
        const { email } = this.props
        const { emailClicked, isClicked, isRead } = this.state
        let readImg = isRead ? '📰' : '🗞️'
        return <section className="email-preview" >
            <div className="user-mails" onClick={() => this.onClickEmail(email.id)}>
                <h2>{email.from}</h2>
                <h2>{email.subject}</h2>
                <button onClick={(event) => this.onClickRead(event,email.id)}>{readImg}</button>
                <h2>{email.sentAt}</h2>

            </div>
            {isClicked && <EmailDetails email={emailClicked} />}
        </section>

    }
}