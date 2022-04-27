import { EmailList } from '../cmps/email-list.jsx'
import { emailService } from '../../mail/services/email.service.js'
import {UnReadCount} from '../../mail/cmps/unread-count.jsx'

export class EmailApp extends React.Component {
    state = {
        emails: []
    }
    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        emailService.query()
            .then(emails => {
                this.setState({ emails })
            })
    }

    render() {
        const { emails } = this.state
        return <section className="email-app">
            <EmailList emails={emails} />
            <UnReadCount emails={emails}/>
        </section>
    }
}