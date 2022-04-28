import { EmailList } from '../cmps/email-list.jsx'
import { emailService } from '../../mail/services/email.service.js'
import { UnReadCount } from '../../mail/cmps/unread-count.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'


const { Link } = ReactRouterDOM

export class EmailApp extends React.Component {
    state = {
        emails: [],
        filterBy: null
    }

    removeEvent;

    componentDidMount() {
        this.setFilter ()
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

    removeMail = (email) => {
        emailService.deleteEmail(email)
            .then(emails => {
                console.log(emails)
                this.setState({ emails })
            })
            .then(() => {
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'Mail removed successfully'
                })
            })
    }

    setFilter = () => {
        this.removeEvent = eventBusService.on('filter-emails', (filterBy) => {
            
            this.setState({ filterBy })
            this.loadMails()
        })
    }
   
    render() {
        const { emails } = this.state
        if (!emails.length) return <h1>No emails</h1>
        return <section className="email-app">
            <Link to='/newEmail'><button className="new-mail"><img src="assets/imgs/notes-imgs/icon-google.webp" /> Compose</button></Link>
            <div className="email-board">
                <EmailList emails={emails} removeMail={this.removeMail} />
                <nav className="bar">
                    <Link to="/email">Inbok</Link>
                    <UnReadCount />
                </nav>
            </div>
        </section>
    }
}