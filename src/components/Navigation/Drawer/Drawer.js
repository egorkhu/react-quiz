import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {
    clickHandler = () => {
        this.props.onOpenHandler()
    }

    renderLinks(links)  {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        activeClassName={classes.active}
                        exact={link.exact}
                        onClick={this.clickHandler}
                    >{link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [
            classes.Drawer,
        ]

        if (!this.props.isMenuOpen) {
            cls.push(classes.close)
        }

        let links = [
            {to: '/', label: 'Список', exact: true},
        ]

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false})
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>

                {this.props.isMenuOpen ? <Backdrop onClick={ this.props.onOpenHandler }/> : null}
            </>
        )
    }
}

export default Drawer