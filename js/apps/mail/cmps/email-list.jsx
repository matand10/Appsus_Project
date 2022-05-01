import { EmailPreview } from '../cmps/email-preview.jsx'
export function EmailList({ emails, removeMail ,getEmailToNote,updateRead}) {

    return <section className="email-list">
        <table>
            <tbody>
                {emails.map(email => <EmailPreview email={email} key={email.id} removeMail={removeMail} getEmailToNote={getEmailToNote} updateRead={updateRead}/>)}
            </tbody>
        </table>
    </section>
}