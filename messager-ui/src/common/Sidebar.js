import React, {Component} from 'react';
import {push as Menu} from 'react-burger-menu'
import './Sidebar.css'

class Sidebar extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    //TODO: Сделать кастомные картинки, а не задавать их жестко в коде
    render() {
        return (
            <Menu disableOverlayClick disableAutoFocus >
                <a id="about" className="menu-item" href="/about">
                    <div>
                        <figure className="ms-avatar--size-30 ms-avatar">
                            <div>
                                <img className="ms-img"
                                     src="https://static-cdn.jtvnw.net/jtv_user_pictures/arthas-profile_image-526fee4e5d633d89-70x70.jpeg"/>
                            </div>
                        </figure>
                    </div>
                    <div><span title="Сообщество Tesla"/>Илон Маск</div>
                </a>
                <a id="about" className="menu-item" href="/about">
                    <div>
                        <figure className="ms-avatar--size-30 ms-avatar">
                            <div>
                                <img className="ms-img"
                                     src="https://static-cdn.jtvnw.net/jtv_user_pictures/towelliee-profile_image-f9752afc441702cc-70x70.jpeg"/>
                            </div>
                        </figure>
                    </div>
                    <div><span title="Сообщество Tesla"/>Филипп Киркоров</div>
                </a>
                <a id="about" className="menu-item" href="/about">
                    <div>
                        <figure className="ms-avatar--size-30 ms-avatar">
                            <div>
                                <img className="ms-img"
                                     src="https://static-cdn.jtvnw.net/jtv_user_pictures/61763701-db95-45b3-8622-25c1ca38e1c1-profile_image-70x70.png"/>
                            </div>
                        </figure>
                    </div>
                    <div><span title="Сообщество Tesla"/>Дональд Трамп</div>
                </a>
                <a id="about" className="menu-item" href="/about">
                    <div>
                        <figure className="ms-avatar--size-30 ms-avatar">
                            <div>
                                <img className="ms-img"
                                     src="https://static-cdn.jtvnw.net/jtv_user_pictures/aktep-profile_image-c62f7f89493fa9ea-70x70.jpeg"/>
                            </div>
                        </figure>
                    </div>
                    <div><span title="Сообщество Tesla"/>Сообщество Tesla</div>
                </a>
            </Menu>
        );
    }
}

export default Sidebar;