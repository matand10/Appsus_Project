import {EmailList} from '../cmps/email-list.jsx'
import {emailService} from '../../mail/services/email.service.js'


export class EmailApp extends React.Component{
    state={
        users:[]
    }
    componentDidMount(){
        this.loadMails()
    }

    loadMails=()=>{
        emailService.query()
        .then(users => {
            this.setState({users})
        })
        
        
    }

    render(){
        const {users}=this.state
        console.log(users)
        return <section className="email-app">
            <EmailList users={users}/>
        </section>
    }
}