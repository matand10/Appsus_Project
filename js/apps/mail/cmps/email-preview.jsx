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
    onClickRead = (ev,emailId) => {
        ev.stopPropagation()
        const { isRead } = this.state
        emailService.getEmailById(emailId)
        .then(email => {
            emailService.updateKey(email.id,'isRead')
            this.setState({ isRead: !isRead })
        })
    }
    
    onRemove=(ev,emailId)=>{
        ev.stopPropagation()
        // emailService.getEmailById(emailId)
        // .then(email => {
            this.props.removeMail(emailId)
        // })
    }

    render() {
        const { email } = this.props
        const { emailClicked, isClicked, isRead } = this.state
        let readImg = isRead ? 'open' : 'close'
        return <section className="email-preview" >
            <div className="user-mails" onClick={() => this.onClickEmail(email.id)}>
                <h2>{email.from}</h2>
                <h2>{email.subject}</h2>
                <img src={`assets/imgs/notes-imgs/envelope-${readImg}.svg`} onClick={(event) => this.onClickRead(event,email.id)}/>
                <img src="assets/imgs/notes-imgs/trash.svg" onClick={(event)=>this.onRemove(event,email.id)}/>
                <h2>{email.sentAt}</h2>

            </div>
            {isClicked && <EmailDetails email={emailClicked} />}
        </section>

    }
}