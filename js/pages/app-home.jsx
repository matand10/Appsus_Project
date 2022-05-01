import { AppFooter } from '../cmps/app-footer.jsx'
const { NavLink, withRouter } = ReactRouterDOM

function _Home() {
    return <section className="home">
        <div className="home-apps">
            <NavLink to="/email"><img src="assets/imgs/home/email.svg" /></NavLink>
            <NavLink to="/notes"><img src="assets/imgs/home/Google-keep.svg" /></NavLink>
            <NavLink to="/book"><img src="assets/imgs/home/Google-book.png" /></NavLink>
        </div>
        <AppFooter />
    </section>
}

export const AppHome = withRouter(_Home)