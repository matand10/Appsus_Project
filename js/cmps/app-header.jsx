import { FilterItem } from '../../js/apps/mail/cmps/email-filter.jsx'
import { Modal } from '../pages/main-modal.jsx'

const { Link, NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

    state = {
        isModalOpen: false
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    closeModal = (value) => {
        this.setState({ isModalOpen: value })
    }


    render() {
        const { isModalOpen } = this.state
        return <header className="app-header main-layout">
            <div className="logo" onClick={() => this.props.history.push('/')}>
                <img src="../assets/imgs/logo.png" />
            </div>
            <FilterItem />
            <nav className="header-nav">
                <img onClick={() => this.toggleModal()} className="dots-menu" src="./assets/imgs/home/dots-menu.svg" />
            </nav>
            {isModalOpen && <Modal close={this.closeModal} />}
        </header>
    }
}

export const AppHeader = withRouter(_AppHeader)