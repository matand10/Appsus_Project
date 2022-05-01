const { NavLink, withRouter } = ReactRouterDOM


export function AppFooter() {

    const style = {
        background: "url('assets/imgs/footer/wave.png')"
    }

    return <footer className="main-footer">
        <div className="waves">
            <div className="wave" id="wave1" style={style}></div>
            <div className="wave" id="wave2" style={style}></div>
            <div className="wave" id="wave3" style={style}></div>
            <div className="wave" id="wave4" style={style}></div>
        </div>
        <div className="footer-nav">
            <ul className="nav">
                <li><i className="fab fa-instagram-square"></i></li>
                <li><i className="fab fa-linkedin"></i></li>
                <li><i className="fab fa-twitter-square"></i></li>
            </ul>
            <ul className="menu">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About Us</NavLink>
            </ul>
            <p>2022 | All Rights Reserved | Yael and Matan's Project</p>
        </div>
    </footer>
}