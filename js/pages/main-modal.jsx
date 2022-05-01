

const { Link, NavLink, withRouter } = ReactRouterDOM


export function Modal({ close }) {


    const closeModal = (value) => {
        close(value)
    }

    return <section className="header-modal">
        <NavLink onClick={() => closeModal(false)} className="nav" to="/email" exact><img className="modal-img" src="assets/imgs/home/email.svg" /></NavLink>
        <NavLink onClick={() => closeModal(false)} className="nav" to="/notes" exact><img className="modal-img" src="assets/imgs/home/Google-keep.svg" /></NavLink>
        <NavLink onClick={() => closeModal(false)} className="nav" to="/" exact><img className="modal-img" src="assets/imgs/home/google-home.svg" /></NavLink>
    </section>
}