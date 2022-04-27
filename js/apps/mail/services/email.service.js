import { DataMail } from '../../../services/ajax.email.js'
import {utilService} from '../../../services/util.service.js'
export const emailService={
    query
}

function query(){
    DataMail.getDataMail()
    .then(emails=>{
        console.log(emails)
        let myMail=emails.map(email=>{
            
        })
    })
}
// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt : 1551133930594,
//     to: 'momo@momo.com'
//     }