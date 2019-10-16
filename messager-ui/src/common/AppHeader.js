import React, {Component} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import {Redirect} from 'react-router-dom'
import {Layout, Menu, Dropdown, Icon} from 'antd';
import Search from '../common/Search';
import Questions from '../user/questions/Questions'
import {signup} from "../util/APIUtils";

const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    redirectToLogin = () => {
        this.props.history.push("/login");
    }

    redirectToSignup = () => {
        this.props.history.push("/signup");
    }

    redirectToProfile = () => {
        this.props.history.push(`/users/${this.props.currentUser.username}/profile`);
    }

    redirectToQuestionMenu = () => {
        this.props.history.push("/questions");
    }

    render() {
        let menuItems;
        if (this.props.currentUser) {
            menuItems = [
                <div className="navbar-buttons navbar-auth-buttons">
                    <button onClick={this.redirectToProfile} type="button" className="btn btn-default">
                        <span>{this.props.currentUser.username}</span>
                    </button>
                </div>
            ];
        } else {
            menuItems = [
                <div className="navbar-buttons navbar-auth-buttons">
                    <button onClick={this.redirectToLogin} type="button" className="btn btn-default">
                        <span>Sign in</span>
                    </button>
                    <button id={'signup'} onClick={this.redirectToSignup} type="button" className="btn btn-default">
                        <span>Sign up</span>
                    </button>
                </div>
            ];
        }

        return (
            <Header className="navbar">
                <div className="container">
                    <div className="app-title">
                        <Link to="/">AskLion</Link>
                    </div>
                    <Search/>
                    <div className="navbar-buttons ui-questions-button">
                        <button onClick={this.redirectToQuestionMenu} type="button" className="btn btn-default">
                            <span>Questions</span>
                        </button>
                    </div>
                    {menuItems}
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}}/> <Icon type="down"/>
            </a>
        </Dropdown>
    );
}


export default withRouter(AppHeader);