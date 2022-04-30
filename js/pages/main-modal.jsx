

const { Link, NavLink, withRouter } = ReactRouterDOM


export function Modal({ close }) {


    const closeModal = (value) => {
        close(value)
    }

    return <section className="Modal">
        <NavLink onClick={() => closeModal(false)} className="nav" to="/" exact><img className="modal-img" src="assets/imgs/home/home.png" /></NavLink>
        <NavLink onClick={() => closeModal(false)} className="nav" to="/notes" exact><img className="modal-img" src="assets/imgs/home/notes.png" /></NavLink>
        <NavLink onClick={() => closeModal(false)} className="nav" to="/email" exact><img className="modal-img" src="assets/imgs/home/email.png" /></NavLink>
    </section>
}