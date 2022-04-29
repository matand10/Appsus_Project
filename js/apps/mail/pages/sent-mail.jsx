import {UnReadCount} from '../../mail/cmps/unread-count.jsx'
const { Link } = ReactRouterDOM
export class sentMails extends React.Component {

    render() {
        return <section>
            Sent mails
            <nav className="bar">
                <Link to="/email">Inbok</Link>
                <Link to="/sent">Sent</Link>
                <UnReadCount />
            </nav>
        </section>
    }
}