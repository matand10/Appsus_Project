export function EmailDetails({email}){


    
        // const {email}=this.props
        return <div className="details">
            <h1>{email.subject}</h1>
            <h3>{email.from}  {email.mail}</h3>
            <h4>{email.body}</h4>
        </div>
    }
