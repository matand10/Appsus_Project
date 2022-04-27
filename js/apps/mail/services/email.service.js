import { DataMail } from '../../mail/services/ajax.email.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
export const emailService = {
    query
}

const USER_KEY = 'userDB'
function query() {
    let users = storageService.loadFromStorage(USER_KEY) ? storageService.loadFromStorage(USER_KEY) : []
    console.log(users)
    if (!users.length) return _creatEmail().then(res => {
        storageService.saveToStorage(USER_KEY, res)
        return res
    })
    return Promise.resolve(users)
}

function _creatEmail() {
    let myEmails = []
    DataMail.getDataMail()
        .then(emails => {
            emails.map(email => {
                let myEmail = {
                    id: utilService.makeId(),
                    fullName: email.name + ' ' + email.lastName,
                    subject: utilService.makeLorem(10),
                    body: utilService.makeLorem(50),
                    isRead: false,
                    sentAt: new Date().getHours() + ':' + new Date().getMinutes(),
                    mail: email.email
                }
                myEmails.push(myEmail)
            })
        })
    return Promise.resolve(myEmails)

}
// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt : 1551133930594,
//     to: 'momo@momo.com'
//     }