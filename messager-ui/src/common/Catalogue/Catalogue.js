import React, {Component} from 'react'
import './Catalogue.css';
import {Route, withRouter, Redirect} from "react-router-dom";
import {Table, Col, Row, Skeleton, Switch, Card, Icon, Avatar, Button, List} from 'antd';
import {getUserBucketGoods, getCatalogueOfGoods} from "../../util/APIUtils";
import {formatDate} from "../../util/Helpers";

const {Column, ColumnGroup} = Table;
const {Meta} = Card;

const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

class Catalogue extends Component {
    state = {
        query: '',
        goods: [],
        lastParticipants: [],
        loading: false
    };

    constructor(props) {
        super(props);
        this.initCatalogueOfGoods();
    }

    initCatalogueOfGoods() {
        let goods = getCatalogueOfGoods();
        goods
            .then(response => {
                this.setState(this.initGoods(response));
            });
    }

    initGoods(response) {
        for (let i = 0; i < response.length; i++) {
            response[i].createdAt = formatDate(response[i].createdAt.epochSecond);
            this.state.goods.push(response[i]);
            this.setState({goods: this.state.goods})
        }
    }

    render() {

        return (
            <List className="catalogue-good-list"
                  grid={{gutter: 16, column: 4}}
                  dataSource={this.state.goods}
                  renderItem={item => (
                      <List.Item
                          key={item.id}
                      >
                          <Card className="advertisement" hoverable title="Может быть интересно"
                                style={{width: 240}}
                                cover={<img alt="example" align="middle"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                                style={{width: 300, marginTop: 16}}
                                actions={[
                                    <div onClick={this.redirectToGood}>
                                        <button>Посмотреть предложение</button>
                                    </div>
                                ]}
                          >
                              <Meta title={item.name} description={'Цена: ' + item.currentPrice + "$"}/>
                          </Card>
                      </List.Item>
                  )}
            />
        )
    }
}

export default withRouter(Catalogue);


