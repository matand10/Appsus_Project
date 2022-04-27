const { Link } = ReactRouterDOM
export class EmailPreview extends React.Component {
    render() {
        const { user } = this.props
        console.log(user)
        return <Link to={`/email/:${user.id}`}>
            <section className="email-preview">
                <div className="user-mails">
                    <h2>{user.fullName}</h2>
                    <h2>{user.subject}</h2>
                    <h2>{user.sentAt}</h2>

                </div>
            </section>
        </Link>
    }
}