import { AppHeader } from './js/cmps/app-header.jsx'
import { AppHome } from './js/pages/app-home.jsx'
import { EmailApp } from './js/pages/app-email.jsx'
import { NotesApp } from './js/pages/app-notes.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
    return <Router>
        <AppHeader />
        <hr />

        <section className="app">
            <Switch>
                <Route path="/notes" component={NotesApp}></Route>
                <Route path="/email" component={EmailApp}></Route>
                <Route path="/" component={AppHome}></Route>
            </Switch>
        </section>

        {/* <UserMsg /> */}
    </Router>

}