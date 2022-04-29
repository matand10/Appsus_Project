import { EmailPreview } from '../cmps/email-preview.jsx'
export function EmailList({ emails, removeMail ,getEmailToNote}) {

    return <section className="email-list">
        <table>
            <tbody>
                {emails.map(email => <EmailPreview email={email} key={email.id} removeMail={removeMail} getEmailToNote={getEmailToNote}/>)}
            </tbody>
        </table>
    </section>
}