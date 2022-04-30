const { Route, NavLink } = ReactRouterDOM

export function About() {

    return <section className="about">
        <h3>We are all about Book!!</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam cupiditate sequi blanditiis dicta debitis mollitia nesciunt consectetur quo atque aperiam totam eligendi, explicabo, nihil, inventore earum obcaecati placeat voluptatum vero.</p>

        {/* <nav>
            <NavLink to="/about/team">Team</NavLink>
            <NavLink to="/about/vision">Vision</NavLink>
        </nav> */}

        <section>
            <Route path="/about/team" component={Team} />
            <Route path="/about/vision" component={Vision} />
        </section>
    </section>
}

function Team() {
    return <section className="team">
        <div>Mishu Mashu</div>
        <div>Jorge </div>
    </section>
}

function Vision() {
    return <section className="vision">
        <div>To take your money</div>
        <div>Sell nice cars</div>
    </section>
}