export class EmailDetails extends React.Component{


    render(){
        const {email}=this.props
        console.log('get email setails',email)
        return <section>
            <h1>{email.subject}</h1>
            <h3>{email.from} {email.mail}</h3>
            <h4>{email.body}</h4>
        </section>
    }
}