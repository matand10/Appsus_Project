import { AppFooter } from '../cmps/app-footer.jsx'
const { NavLink, withRouter } = ReactRouterDOM

export function AppAbout() {



    return <section className="about">
        <div className="about-container">
            <div className="content-section">
                <div className="title">
                    <h1>About Us</h1>
                </div>
                <div className="content">
                    <h3>Lorem ipsum dolor sit amet consectetur adipis quid?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi non eos omnis, ut reiciendis culpa. Perspiciatis eius id, quis vitae fuga omnis provident cum dignissimos? Libero debitis neque labore?
                        Ipsa corrupti minima illo eius, repudiandae totam magnam eum fuga dicta ut. Quas commodi id ipsum! Hic tenetur dolor optio temporibus similique, ut, eaque, quia quibusdam adipisci mollitia ad assumenda.</p>
                    <div className="about-btn">
                        <NavLink to="/">Home</NavLink>
                    </div>
                </div>
                <div className="social">
                    <a href="#"><i className="fab fa-instagram-square"></i></a>
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-twitter-square"></i></a>
                </div>
            </div>
            <div className="image-section">
                <img className="matan-img" src="assets/imgs/about/My pic.jpg" />
                <img className="yael-img" src="assets/imgs/about/Yael.jpg" />
            </div>
        </div>




        {/* <AppFooter /> */}
    </section>
}