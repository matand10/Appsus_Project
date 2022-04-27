import { EmailPreview } from '../cmps/email-preview.jsx'
export function EmailList({ emails }) {

    return <section className="email-list">
        {emails.map(email => <EmailPreview email={email} />)}
    </section>
}