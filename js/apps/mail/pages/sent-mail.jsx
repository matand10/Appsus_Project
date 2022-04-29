import { UnReadCount } from '../../mail/cmps/unread-count.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'
import { emailService } from '../../mail/services/email.service.js'
import { SentMailsList } from '../cmps/sent-mail-list.jsx'

const { Link } = ReactRouterDOM

export class sentMails extends React.Component {
    state = {
        sentMails: []
    }

    componentDidMount() {
        emailService.getMails()
            .then(newMails => {
                let sentFilterMail = newMails.filter(mail => mail.isSent)
                this.setState({ sentMails: sentFilterMail })
            })
    }

    removeMail = (email) => {
        emailService.deleteEmail(email)
            .then(emails => {
                this.setState({ sentMails: emails })
            })
            .then(() => {
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'Mail removed successfully'
                })
            })
    }

    render() {
        const { sentMails } = this.state
        return <section className="email-app">
            <div className="email-board">
                <SentMailsList sentMails={sentMails} removeMail={this.removeMail} />
                <nav className="bar">
                    <Link to="/email">Inbok</Link>
                    <Link to="/sent">Sent</Link>
                    <UnReadCount />
                </nav>
            </div>
        </section>
    }
}