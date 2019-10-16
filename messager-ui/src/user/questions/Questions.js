import React, {Component} from 'react'
import './Questions.css';
import {Route, withRouter, Redirect} from "react-router-dom";
import {Card, Row, Col, List, message, Avatar, Spin} from 'antd';
import Autocomplete from "react-autocomplete";
import {getAllUsers, getLastParticipants} from "../../util/APIUtils";

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

class Questions extends Component {
    state = {
        query: '',
        users: [],
        lastParticipants: [],
        loading: false,
    };

    constructor(props) {
        super(props);
        this.initUsers();
        this.initLastParticipants();
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

    initLastParticipants() {
        let lastParticipants = getLastParticipants();
        lastParticipants
            .then(response => {
                this.setState(this.initLastParticipantsResponseValues(response));
            });
    }

    initLastParticipantsResponseValues(response) {
        for (let i = 0; i < response.length; i++) {
            this.state.lastParticipants.push(response[i]);
        }
    }

    initResponseValues(response) {
        for (let i = 0; i < response.length; i++) {
            this.state.users.push({label: response[i]});
        }
    }

    loadedRowsMap = {};

    handleInfiniteOnLoad = ({startIndex, stopIndex}) => {
        let {lastParticipants} = this.state;
        this.setState({
            loading: true,
        });
        for (let i = startIndex; i <= stopIndex; i++) {
            // 1 means loading
            this.loadedRowsMap[i] = 1;
        }
        if (lastParticipants.length > 19) {
            message.warning('Virtualized List loaded all');
            this.setState({
                loading: false,
            });
            return;
        }
    };

    isRowLoaded = ({index}) => !!this.loadedRowsMap[index];

    renderItem = ({index, key, style}) => {
        const {lastParticipants} = this.state;
        const item = lastParticipants[index];
        return (
            <List.Item key={key} style={style}>
                <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description={item.email}
                />
                <div>Content</div>
            </List.Item>
        );
    };

    render() {
        const {lastParticipants} = this.state;
        const vlist = ({height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width}) => (
            <VList
                autoHeight
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                overscanRowCount={2}
                rowCount={lastParticipants.length}
                rowHeight={73}
                rowRenderer={this.renderItem}
                onRowsRendered={onRowsRendered}
                scrollTop={scrollTop}
                width={width}
            />
        );
        const autoSize = ({height, isScrolling, onChildScroll, scrollTop, onRowsRendered}) => (
            <AutoSizer disableHeight>
                {({width}) =>
                    vlist({
                        height,
                        isScrolling,
                        onChildScroll,
                        scrollTop,
                        onRowsRendered,
                        width,
                    })
                }
            </AutoSizer>
        );
        const infiniteLoader = ({height, isScrolling, onChildScroll, scrollTop}) => (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.handleInfiniteOnLoad}
                rowCount={lastParticipants.length}
            >
                {({onRowsRendered}) =>
                    autoSize({
                        height,
                        isScrolling,
                        onChildScroll,
                        scrollTop,
                        onRowsRendered,
                    })
                }
            </InfiniteLoader>
        );
        return (
            <Row className="row questionLayout">
                <Col span={6} className="questionsLabel">
                    <div className="questionsTitle">Questions</div>
                    <Row>
                        <Autocomplete
                            inputProps={{id: 'searchInput', placeholder: 'Try fo find someone..'}}
                            wrapperStyle={{position: 'relative', display: 'inline-block'}}
                            wrapperProps={{id: 'questionLabelFindUsers'}}
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
                    </Row>
                    <List>
                        {lastParticipants.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
                        {this.state.loading && <Spin className="demo-loading"/>}
                    </List>
                </Col>
                <Col span={17} bordered={true}>
                    <Card title="Questions" bordered={true}>
                        <div>Questions</div>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Questions);


