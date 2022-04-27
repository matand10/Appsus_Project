import { emailService } from '../../mail/services/email.service.js'

export function UnReadCount() {
    
return <section className="count-unread">
    <div>Unread mails: {emailService.countUnreadMail()}%</div>
</section>
}