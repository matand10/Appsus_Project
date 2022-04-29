import { AppHeader } from './js/cmps/app-header.jsx'
import { AppHome } from './js/pages/app-home.jsx'
import { EmailApp } from './js/apps/mail/pages/app-email.jsx'
import { NotesApp } from './js/apps/keep/pages/app-notes.jsx'
import { AddSendEmail } from './js/apps/mail/pages/email-add-send.jsx'
import { UserMsg } from './js/apps/mail/cmps/user-msg.jsx'
import { sentMails } from './js/apps/mail/pages/sent-mail.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
    return <Router>
        <AppHeader />
        <hr />
        <section className="app">
            <Switch>
                <Route path="/sent" component={sentMails}></Route>
                <Route path="/newEmail" component={AddSendEmail}></Route>
                <Route path="/notes" component={NotesApp}></Route>
                <Route path="/email" component={EmailApp}></Route>
                <Route path="/" component={AppHome}></Route>
            </Switch>
        </section>

        <UserMsg />
    </Router>

}