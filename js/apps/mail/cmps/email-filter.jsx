import { eventBusService } from '../../../services/event-bus-service.js'
import { emailService } from '../../mail/services/email.service.js'
import { noteService } from '../../keep/services/note.service.js'

export class FilterItem extends React.Component {
    state = {
        filterBy: {
            subject: '',
        }
    }

    handleChange = ({ target }) => {
        let value = target.value
        let field = target.name
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, subject: value } }))
    }


    onFilter = (ev) => {
        ev.preventDefault()
        emailService.query(this.state.filterBy)
            .then(filterEmail => {
                eventBusService.emit('filter-emails', filterEmail)
            })

        noteService.query(this.state.filterBy)
            .then(filterNotes => {
                eventBusService.emit('filter-notes', filterNotes)
            })
    }



    render() {


        const { subject } = this.state.filterBy
        return <section className="search-line">
            <form onSubmit={this.onFilter}>
                <label htmlFor="search"></label>
                <input id="search" type="search" name="subject" value={subject} onChange={this.handleChange} />
                <button>Filter</button>
            </form>
        </section>
    }
}