import React, {Component} from 'react';
import './Usermenu.css'
import 'antd/dist/antd.css';
import {Menu, Dropdown, Icon, notification} from 'antd';
import {ACCESS_TOKEN} from "../constants";



class Usermenu extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    //TODO: Сделать кастомные картинки, а не задавать их жестко в коде
    render() {
       return <UserDropdownMenu
            currentUser={this.props.currentUser}
            handleMenuClick={this.handleMenuClick}/>
    }
}

function UserDropdownMenu(props) {
    const menu = (
        <Menu onClick={props.handleMenuClick}>
            <Menu.Item key="0">
                <a href="http://www.alipay.com/">1st menu item</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="http://www.taobao.com/">2nd menu item</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">Logout</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']} className="usermenu">
            <a className="ant-dropdown-link" href="#">
                Click me <Icon type="down"/>
            </a>
        </Dropdown>
    );
}

export default Usermenu;