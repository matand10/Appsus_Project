import { emailService } from '../../mail/services/email.service.js'
export class SortEmail extends React.Component {
    state = {
        sortBy: 'sentAt'
    }

    onSetSort = (sortBy) => {
        this.setState({ sortBy })
        this.props.setSort(sortBy)


    }
    render() {
        // const {sentAt,subject}=this.state.sortBy
        return <section className="sort-email">
            Sort by:
            <select className="sort-by" onChange={(event) => this.onSetSort(event.target.value)}>
                <option value="">Select sorting</option>
                <option value="date">Date</option>
                <option value="title">Title</option>
            </select>
        </section>
    }
}