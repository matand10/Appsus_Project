const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
    return <header className="app-header main-layout">
        <h3 onClick={() => props.history.goBack()}>Appsus</h3>
        <nav className="header-nav">
            <NavLink className="nav" to="/" exact>Home</NavLink>

            {/* <NavLink to="/email">Email</NavLink> */}
            {/* <NavLink to="/notes" >Notes</NavLink> */}
        </nav>
    </header>
}

export const AppHeader = withRouter(_AppHeader)