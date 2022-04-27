import { AppHeader } from './js/cmps/app-header.jsx'
import { AppHome } from './js/pages/app-home.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
    return <Router>
        <AppHeader />
        <hr />

        <section className="app">
            <Switch>
                {/* <Route path="/book" component={BookApp}></Route> */}
                {/* <Route path="/about" component={About}></Route> */}
                <Route path="/" component={AppHome}></Route>
            </Switch>
        </section>

        {/* <UserMsg /> */}
    </Router>

}