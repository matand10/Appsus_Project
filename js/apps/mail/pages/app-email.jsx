import { DataMail } from '../../../services/ajax.email.js'
import { EmailList } from '../cmps/email-list.jsx'


export class EmailApp extends React.Component {
    state = {
        emails: []
    }
    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        // DataMail.getDataMail()
        // .then(emails=>{
        //     this.setState({emails})
        // })
    }

    render() {
        const { emails } = this.state
        return <section className="email-app">
            <h1>Hello email</h1>
            <EmailList emails={emails} />
        </section>
    }
}