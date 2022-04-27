import { DataMail } from "../../../services/ajax.email.js"


export class EmailApp extends React.Component{

    getMail=()=>{
        DataMail.getDataMail()
        .then(res=>console.log(res))
    }
    componentDidMount(){
        this.getMail()
    }
    render(){
        return <section>
            <h1>Hello email</h1>
        </section>
    }
}