import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'
import { BooksData } from './books.data.js'


export const bookService = {
    query,
    getBookById,
    addReview,
    removeReview,
    addGoogleBook,
    getNextBookId,
    getPrevBookId
}

const BOOKS_KEY = 'booksDB'

function query(filterBy) {
    let books = _loadFromStorage()
    if (!books) {
        books = BooksData.getBooks()
        _saveToStorage(books)
    }

    if (filterBy) {
        let { bookName, minPrice, maxPrice } = filterBy
        if (!minPrice) minPrice = 0
        if (!maxPrice) maxPrice = Infinity

        books = books.filter(book => {
            return (book.title.toLowerCase().includes(bookName.toLowerCase()) &&
                book.listPrice.amount <= maxPrice &&
                book.listPrice.amount >= minPrice)
        })
    }
    return Promise.resolve(books)
}

function getBookById(bookId) {
    let books = _loadFromStorage()
    let book = books.find(book => book.id === bookId)
    return Promise.resolve(book)
}

function removeReview(reviewIdx, bookId) {
    let books = _loadFromStorage()
    let book = books.find(book => book.id === bookId)
    let reviews = book.reviews
    reviews.splice(reviewIdx, 1)
    _saveToStorage(books)
    return Promise.resolve(book)
}

function addGoogleBook(googleBook) {
    let myBook = {
        id: utilService.makeId(),
        title: googleBook.volumeInfo.title,
        subtitle: googleBook.volumeInfo.subtitle ? googleBook.volumeInfo.subtitle : utilService.makeLorem(30),
        authors: googleBook.volumeInfo.authors ? googleBook.volumeInfo.authors : ['Hablas Expanol'],
        categories: googleBook.volumeInfo.categories,
        description: googleBook.volumeInfo.description ? googleBook.volumeInfo.description : utilService.makeLorem(),
        language: googleBook.volumeInfo.language,
        listPrice: { amount: utilService.getRandomIntInclusive(15, 200), currencyCode: googleBook.saleInfo.country, isOnSale: true },
        pageCount: googleBook.volumeInfo.pageCount ? googleBook.volumeInfo.pageCount : 'No information',
        publishedDate: googleBook.volumeInfo.publishedDate,
        thumbnail: googleBook.volumeInfo.imageLinks.thumbnail
    }

    let books = _loadFromStorage()
    books.push(myBook)
    _saveToStorage(books)
    return Promise.resolve(books)
}


function getPrevBookId(bookId) {
    const books = _loadFromStorage()
    const bookIdx = books.findIndex(book => bookId === book.id)
    const prevBookId = (bookIdx - 1 === -1) ? books.length - 1 : bookIdx - 1
    return books[prevBookId].id
}

function getNextBookId(bookId) {
    const books = _loadFromStorage()
    const bookIdx = books.findIndex(book => bookId === book.id)
    const nextBookId = (bookIdx + 1 === books.length) ? 0 : bookIdx + 1
    return books[nextBookId].id
}

function addReview(bookId, review) {
    let books = _loadFromStorage()
    let book = books.find(book => book.id === bookId)
    if (!book.reviews) book.reviews = []
    book.reviews.push(review)
    _saveToStorage(books)
    console.log(book);
    return Promise.resolve(book)
}

function _saveToStorage(books) {
    storageService.saveToStorage(BOOKS_KEY, books)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(BOOKS_KEY)
}
