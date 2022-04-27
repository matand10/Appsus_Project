import { AppHeader } from './js/cmps/app-header.jsx'
import { AppHome } from './js/pages/app-home.jsx'
import { EmailApp } from './js/apps/mail/pages/app-email.jsx'
import { NotesApp } from './js/apps/keep/pages/app-notes.jsx'
// import {EmailDetails} from './js/apps/mail/pages/email-detail.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
    return <Router>
        <AppHeader />
        <hr />

        <section className="app">
            <Switch>
                {/* <Route path="/email/:bookId" component={EmailDetails}></Route> */}
                <Route path="/notes" component={NotesApp}></Route>
                <Route path="/email" component={EmailApp}></Route>
                <Route path="/" component={AppHome}></Route>
            </Switch>
        </section>

        {/* <UserMsg /> */}
    </Router>

}