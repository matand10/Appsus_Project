
const { NavLink, withRouter } = ReactRouterDOM

function _Home() {
    return <section className="home">
        <div className="home-apps">
            <NavLink to="/email"><img src="../assets/imgs/home/email.png" /></NavLink>
            <NavLink to="/"><img src="../assets/imgs/home/books.png" /></NavLink>
            <NavLink to="/notes"><img src="../assets/imgs/home/notes.png" /></NavLink>
        </div>
    </section>
}

export const AppHome = withRouter(_Home)