import { storageService } from '../../../services/storage.service.js'
export const DataMail = {
    getDataMail
}
const MAIL_KEY = 'dataMailDB'
let mailUser = storageService.loadFromStorage(MAIL_KEY) || []

function getDataMail() {
    if (mailUser.length > 0) return Promise.resolve(mailUser)
    return axios.get('http://www.filltext.com/?rows=6&pretty=true&name={firstName}&lastName={lastName}&email={email}')
        .then(res => res.data)
        .then(res => {
            mailUser = res
            storageService.saveToStorage(MAIL_KEY, mailUser)
            return Promise.resolve(mailUser)
        })
}