import { SentMailPreview } from "../../mail/cmps/sent-mail-preview.jsx"

export function SentMailsList({sentMails, removeMail}){

    return <table>
        <tbody>
            {sentMails.map(sentMail=><SentMailPreview sentMail={sentMail} key={sentMail.id}  removeMail={removeMail}/>)}
        </tbody>
    </table>
}