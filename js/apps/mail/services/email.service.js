import { DataMail } from '../../mail/services/ajax.email.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
export const emailService = {
    query,
    getEmailById
}

const USER_KEY = 'userDB'
let gEmails = storageService.loadFromStorage(USER_KEY) || []

function query() {
    if (!gEmails.length) {
        _createEmails()
        storageService.saveToStorage(USER_KEY, gEmails)
    }

    return Promise.resolve(gEmails)
}

function _createEmails() {
    _creatEmail('Gordon Ramsey',['Critical','Memories'])
    _creatEmail('Moshik Rot',['Family','Memories'])
    _creatEmail('Asaf Granit',['Work','Critical'])
    _creatEmail('Chaim Cohen'['Family','Friends'])
    _creatEmail('Aharoni',['Memories','Family'])
    _creatEmail('Meir Adoni',['Romantic','Family'])
    _creatEmail('Yosi Shitrit',['Family','Spam'])
}

function _creatEmail(from,lables) {
    let email= {
        id: utilService.makeId(),
        subject: utilService.makeLorem(10),
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: new Date().getHours() + ':' + new Date().getMinutes(),
        mail: 'test@text.com',
        to: 'Ori',
        from,
        status:{
            inbox,
            sent,
            trash,
            draft
        },
        isStared:false,
        lables
    }
    gEmails.push(email)
}

function getEmailById(emailId) {
    let emails = storageService.loadFromStorage(USER_KEY)
    let email = emails.find(email => emailId === email.id)
    return Promise.resolve(email)
}


// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt : 1551133930594,
//     to: 'momo@momo.com'
//     }