import { EmailList } from '../cmps/email-list.jsx'
import { emailService } from '../../mail/services/email.service.js'
import { UnReadCount } from '../../mail/cmps/unread-count.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'

const { Link } = ReactRouterDOM

export class EmailApp extends React.Component {
    state = {
        emails: []
    }
    removeEvent;
    componentDidMount() {
        this.removeEvent = eventBusService.on('new-emails', (emails) => {
            this.setState({ emails })
        })
        this.loadMails()
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    loadMails = () => {
        emailService.query()
            .then(emails => {
                this.setState({ emails })
            })
    }

    removeMail=(email,idx)=>{
        emailService.deleteEmail(email,idx)
        .then(emails=>{
            this.setState({emails})
        })
    }


    render() {
        const { emails } = this.state
        return <section className="email-app">
            <Link to='/newEmail'><div className="new-mail">New email</div></Link>
            <EmailList emails={emails} removeMail={this.removeMail}/>
            <UnReadCount />
        </section>
    }
}