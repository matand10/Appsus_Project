import { DataMail } from '../../mail/services/ajax.email.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { SortEmail } from '../cmps/email-sort.jsx'

export const emailService = {
    query,
    getEmailById,
    updateKey,
    countUnreadMail,
    addMail,
    deleteEmail,
    getSort,
    getMails,
    addNoteToMail
}

const USER_KEY = 'userDB'
let gEmails = storageService.loadFromStorage(USER_KEY)


function getMails() {
    return Promise.resolve(gEmails)
}

function query(filterBy) {
    gEmails = storageService.loadFromStorage(USER_KEY) || []
    console.log(gEmails)
    if (!gEmails.length) {
        _createEmails()
        storageService.saveToStorage(USER_KEY, gEmails)
    }

    if (Object.keys(filterBy).length) {
        let { subject } = filterBy
        gEmails = gEmails.filter(email => {
            return email.subject.toLowerCase().includes(subject.toLowerCase())
        })
    }
    return Promise.resolve(gEmails)
}

function getSort(sortBy) {
    gEmails = storageService.loadFromStorage(USER_KEY)
    switch (sortBy) {
        case 'date':
            gEmails = gEmails.sort((a, b) => b.sentAt - a.sentAt)
            break;
        case 'title':
            gEmails = gEmails.sort((a, b) => {
                if (a.subject.toLowerCase() < b.subject.toLowerCase()) return -1;
                if (a.subject.toLowerCase() > b.subject.toLowerCase()) return 1;
                return 0;
            })
    }
    storageService.saveToStorage(USER_KEY, gEmails)
    return Promise.resolve(gEmails)
}

function _creatEmail(subject = utilService.makeLorem(10), body = utilService.makeLorem(10), from = 'Muki', lables = ['Spam', 'Friends']) {
    let email = {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        mail: 'test@text.com',
        to: 'Ori',
        from,
        isStared: false,
        isSent: false,
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
    let email = emails.find(email => emailId === email.id)
    email[key] = !email[key]
    storageService.saveToStorage(USER_KEY, emails)
    return Promise.resolve(emails)
}

function countUnreadMail() {
    let emailsUnreadArr = []
    let emails = storageService.loadFromStorage(USER_KEY)
    emailsUnreadArr = emails.filter(email => email.isRead === false)
    return Math.round((emailsUnreadArr.length / emails.length) * 100)
}

function addMail(valSubject, valBody) {
    let emails = storageService.loadFromStorage(USER_KEY)
    let newMail = _creatEmail(valSubject, valBody)
    newMail.isSent = true
    emails.push(newMail)
    storageService.saveToStorage(USER_KEY, emails)
    return Promise.resolve(emails)
}

function addNoteToMail(note) {
    let newMail
    switch (note.type) {
        case 'note-txt':
            newMail = _creatEmail(note.title, note.info.txt)
            break;
        case 'note-img':
            newMail = _creatEmail(note.title, note.info.img)
            break;
        case 'note-todos':
            newMail = _creatEmail(note.title, note.info.todos)
            break;
        case 'note-video':
            newMail = _creatEmail(note.title, note.info.video)
            break
    }
    return Promise.resolve(newMail)
}

function deleteEmail(emailId) {
    let emails = storageService.loadFromStorage(USER_KEY)
    let emailIdx = emails.findIndex(email => emailId === email.id)
    emails.splice(emailIdx, 1)
    storageService.saveToStorage(USER_KEY, emails)
    return Promise.resolve(emails)
}

function _createEmails() {
    _creatEmail('Hells kitchen', utilService.makeLorem(10), 'Gordon Ramsey', ['Critical', 'Memories'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Moshik Rot', ['Family', 'Memories'])
    _creatEmail('The chef game', utilService.makeLorem(10), 'Asaf Granit', ['Work', 'Critical'])
    _creatEmail('Olive oil', utilService.makeLorem(10), 'Chaim Cohen'['Family', 'Friends'])
    _creatEmail('Chines food', utilService.makeLorem(10), 'Aharoni', ['Memories', 'Family'])
    _creatEmail('Master chef', utilService.makeLorem(10), 'Meir Adoni', ['Romantic', 'Family'])
    _creatEmail('The chef game', utilService.makeLorem(10), 'Yosi Shitrit', ['Family', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Avi Cohen', ['Family', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Niall Church', ['Family', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Imran Rosa', ['Family', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Teddie Holman', ['Romantic', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Tamera Carney', ['Family', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Orlaith Rankin', ['Family', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Aleisha Blair', ['Family', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Matt Meyers', ['Family', 'Memories'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Nadeem Naylor', ['Family', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Inayah Mitchell', ['Family', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Cynthia Perez', ['Memories', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Stefanie Cummings', ['Family', 'Critical'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Amelia Alfaro', ['Romantic', 'Spam'])
    _creatEmail(utilService.makeLorem(2), utilService.makeLorem(10), 'Krishan Enriquez', ['Work', 'Spam'])
}