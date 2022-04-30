import { ApiKey } from '../services/git.ignore.js'
import { storageService } from '../services/storage.service.js'

export const bookApiService = {
    getBooksFromApi
}


const BOOKS_API = 'searchBookDB'
let bookSearch = storageService.loadFromStorage(BOOKS_API)

function getBooksFromApi(name) {
    if (bookSearch) return Promise.resolve(bookSearch)
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${name}`)
        .then(res => res.data)
        .then(res => {
            bookSearch = res
            storageService.saveToStorage(BOOKS_API, bookSearch)
            return res
        })
}