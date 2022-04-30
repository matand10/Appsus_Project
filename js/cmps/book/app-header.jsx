const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
    return <header className="app-header">
        <h3 onClick={() => props.history.goBack()}>AMAIZONE</h3>
        <nav className="header-nav">
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/book" >Book List</NavLink>
        </nav>
    </header>
}

export const AppHeader = withRouter(_AppHeader)