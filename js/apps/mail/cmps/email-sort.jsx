
export class SortEmail extends React.Component{
state={
    sortBy:{
        sentAt:'',
        subject:''
    }
}

onSetSort=(sortBy)=>{
    console.log(sortBy)

}
    render(){
        // const {sentAt,subject}=this.state.sortBy
        return <section className="sort-email">
            Sort by:
            <select className="sort-by" onChange={(event)=>this.onSetSort(event.target.value)}>
                <option value="">Select sorting</option>
                <option value='sentAt'>Date</option>
                <option value='subject'>Title</option>
            </select>
        </section>
    }
}