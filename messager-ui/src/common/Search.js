import React, {Component} from 'react'
import {getAllUsers, getCurrentUser, search} from "../util/APIUtils"
import './Search.css';
import Autocomplete from 'react-autocomplete'
import {Route, withRouter, Redirect} from "react-router-dom";

class Search extends Component {
    state = {
        query: '',
        users: []
    };

    constructor(props) {
        super(props);
        this.initUsers()
    }

    redirectToProfile = (selectedUser) => {
        this.props.history.push(`/users/${selectedUser}`);
    }

    initUsers() {
        let users = getAllUsers();
        users
            .then(response => {
                this.setState(this.initResponseValues(response));
            });
    }

    initResponseValues(response) {
        for (let i = 0; i < response.length; i++) {
            this.state.users.push({label: response[i]});
        }
    }

    render() {
        return (
            <Autocomplete
                inputProps={{id: 'searchInput', placeholder: 'Try fo find someone..'}}
                wrapperStyle={{position: 'relative', display: 'inline-block'}}
                wrapperProps={{id: 'searchInputWrapper'}}
                items={this.state.users}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                menuStyle={{
                    borderRadius: '3px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                    background: 'white',
                    padding: '2px 0',
                    fontSize: '90%',
                    position: 'fixed',
                    top: '50px',
                    overflow: 'auto',
                    maxHeight: '100%', // TODO: don't cheat, let it flow to the bottom
                }}

                renderItem={(item, highlighted) =>
                    <div className='menu'
                         key={item.id}
                         style={{backgroundColor: highlighted ? '#eee' : 'transparent'}}

                    >
                        {item.label}
                    </div>
                }
                value={this.state.value}
                onChange={e => this.setState({value: e.target.value})}
                onSelect={(event) => this.redirectToProfile(event)}
            />
        )
    }
}

export default withRouter(Search);

