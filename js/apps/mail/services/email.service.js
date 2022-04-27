import { DataMail } from '../../mail/services/ajax.email.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
export const emailService = {
    query,
    getEmailById,
    updateKey,
    countUnreadMail,
    addMail,
    deleteEmail
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
    _creatEmail('ffdgdfg','fdgffgsdgsdsdsdgsd','Gordon Ramsey', ['Critical', 'Memories'])
    _creatEmail('ffdgdfg','fdgffgsdgsdsdsdgsd','Moshik Rot', ['Family', 'Memories'])
    _creatEmail('ffdgdfg','fdgffgsdgsdsdsdgsd','Asaf Granit', ['Work', 'Critical'])
    _creatEmail('ffdgdfg','fdgffgsdgsdsdsdgsd','Chaim Cohen'['Family', 'Friends'])
    _creatEmail('ffdgdfg','fdgffgsdgsdsdsdgsd','Aharoni', ['Memories', 'Family'])
    _creatEmail('ffdgdfg','fdgffgsdgsdsdsdgsd','Meir Adoni', ['Romantic', 'Family'])
    _creatEmail('ffdgdfg','fdgffgsdgsdsdsdgsd','Yosi Shitrit', ['Family', 'Spam'])
}

function _creatEmail(subject = utilService.makeLorem(10), body = utilService.makeLorem(10), from = 'Muki', lables = ['Spam', 'Friends']) {
    let email = {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: new Date().getHours() + ':' + new Date().getMinutes(),
        mail: 'test@text.com',
        to: 'Ori',
        from,
        // status: {
        //     inbox,
        //     sent,
        //     trash,
        //     draft
        // },
        isStared: false,
        lables
    }
    gEmails.push(email)
    return email
}

function getEmailById(emailId) {
    let emails = storageService.loadFromStorage(USER_KEY)
    let email = emails.find(email => emailId === email.id)
    return Promise.resolve(email)
}

function updateKey(emailId, key) {
    let emails = storageService.loadFromStorage(USER_KEY)
    let email = emails.find(email => {
        if (emailId === email.id) {
            email[key] = true
            storageService.saveToStorage(USER_KEY, emails)
        }
    })
    return Promise.resolve(email)
}

function countUnreadMail() {
    let emailsUnreadArr = []
    let emails = storageService.loadFromStorage(USER_KEY)
    emailsUnreadArr = emails.filter(email => email.isRead === false)
    return Math.round((emailsUnreadArr.length / emails.length) * 100)
}

function addMail(valSubject, valBody) {
    let newMail = _creatEmail(valSubject, valBody)
    gEmails.push(newMail)
    storageService.saveToStorage(USER_KEY, gEmails)
    return Promise.resolve(gEmails)
}

function deleteEmail(email,idx){
    let emails = storageService.loadFromStorage(USER_KEY)
    emails.splice(idx,1)
    storageService.saveToStorage(USER_KEY, emails)
    return Promise.resolve(emails)
}
