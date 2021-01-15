import React, {Component} from 'react'
import classes from './Layout.module.css'
import ToggleMenu from '../../components/Navigation/MenuToggle/ToggleMenu'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import {connect} from 'react-redux'

class Layout extends Component {
    state = {
        isMenuOpen: false
    }

    menuOpenHandler = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isMenuOpen={this.state.isMenuOpen}
                    onOpenHandler={this.menuOpenHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />

                <ToggleMenu
                    isMenuOpen={this.state.isMenuOpen}
                    onMenuOpen={this.menuOpenHandler}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)