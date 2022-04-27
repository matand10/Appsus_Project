
const { NavLink, withRouter } = ReactRouterDOM

function _Home() {
    return <section className="home">
        <div className="home-apps">
            <NavLink to="/">💌</NavLink>
            <NavLink to="/">📕</NavLink>
            <NavLink to="/notes">📝</NavLink>
        </div>
    </section>
}

export const AppHome = withRouter(_Home)