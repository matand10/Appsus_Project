import { EmailList } from '../cmps/email-list.jsx'
import { emailService } from '../../mail/services/email.service.js'
import { UnReadCount } from '../../mail/cmps/unread-count.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'
import { SortEmail } from '../../mail/cmps/email-sort.jsx'
import { noteService } from '../../keep/services/note.service.js'

const { Link } = ReactRouterDOM

export class EmailApp extends React.Component {
    state = {
        emails: [],
        filterBy: {}
    }

    removeEvent;

    componentDidMount() {
        this.setFilter()
        this.loadMails()
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    loadMails = () => {
        emailService.query(this.state.filterBy)
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
            this.setState({ emails: filterBy })
        })
    }

    setSort = (sortBy) => {
        console.log(sortBy)
        emailService.getSort(sortBy)
            .then(sortEmails => {
                console.log(sortEmails)
                this.setState({ emails: sortEmails })
            })
    }

    getEmailToNote = (email) => {
        noteService.createNotedEmail(email)
        this.props.history.push('/notes')
    }

    updateRead = (updateEmails) => {
        this.setState({ emails: updateEmails })
    }

    render() {
        const { emails } = this.state
        if (!emails.length) return <h1>No emails</h1>
        return <section className="email-app main-layout" >
            <div className="compose-sort-container">
                <Link to='/newEmail' className="compose-link">
                    <button className="new-mail">
                        <img src="assets/imgs/notes-imgs/icon-google.webp" />
                        <p>Compose</p>
                    </button>
                </Link>
                <SortEmail setSort={this.setSort} />
            </div>
            <div className="email-board">
                <nav className="bar">
                    <Link to="/email"><img src="assets/imgs/notes-imgs/inbox.svg" /> Inbok</Link>
                    <Link to="/sent"><img src="assets/imgs/notes-imgs/send.svg" /> Sent</Link>
                    <UnReadCount />
                </nav>
                <EmailList emails={emails} removeMail={this.removeMail} getEmailToNote={this.getEmailToNote} updateRead={this.updateRead}/>
            </div>
        </section>
    }
}