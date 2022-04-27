import { EmailPreview } from '../cmps/email-preview.jsx'
export function EmailList({ users }) {

    return <section className="email-list">
        {users.map(user => <EmailPreview user={user} key={user.id}/>)}
    </section>
}