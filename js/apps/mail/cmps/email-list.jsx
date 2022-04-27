import { EmailPreview } from '../cmps/email-preview.jsx'
export function EmailList({ emails,removeMail }) {

    return <section className="email-list">
        {emails.map(email => <EmailPreview email={email} key={email.id} removeMail={removeMail}/>)}
    </section>
}