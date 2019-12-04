import React, {Component} from 'react'
import './Bucket.css';
import {Route, withRouter, Redirect} from "react-router-dom";
import {Table, Col, Row, Skeleton, Switch, Card, Icon, Avatar, Button} from 'antd';
import {getUserBucketGoods} from "../../util/APIUtils";
import {formatDate} from "../../util/Helpers";

const {Column, ColumnGroup} = Table;
const {Meta} = Card;

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

class Bucket extends Component {
    state = {
        query: '',
        userGoods: [],
        lastParticipants: [],
        loading: false
    };

    constructor(props) {
        super(props);
        this.initUserBuckerGoods(this.props.currentUser);
    }

    initUserBuckerGoods(currentUser) {
        if (currentUser != null && currentUser.id != null) {
            let users = getUserBucketGoods(currentUser.id);
            users
                .then(response => {
                    this.setState(this.initGoodsResponseValues(response));
                });
        }
    }

    initGoodsResponseValues(response) {
        for (let i = 0; i < response.length; i++) {
            response[i].createdAt = formatDate(response[i].createdAt.epochSecond);
            this.state.userGoods.push(response[i]);
            this.setState({userGoodsasdas : this.state.userGoods})
        }
    }

    render() {

        return (
            <Row type="flex" justify="space-between">
                <Col span={18} className="order-table">
                    <h2>Моя корзина</h2>
                    < Table
                        rowSelection={rowSelection}
                        dataSource={this.state.userGoods}
                    >
                        <Column title="Наименование товара" dataIndex="name" key="name"/>
                        <Column title="Стоимость" dataIndex="currentPrice" key="currentPrice"/>
                        <Column title="Дата поступления на склад" dataIndex="createdAt" key="createdAt"/>
                        <Column
                            title="Действие"
                            key="action"
                            render={(text, record) => (
                                <span>
          <a>Удалить</a>
        </span>
                            )}
                        />
                    </Table>
                </Col>
                <Col span={4} bordered={true} className="order-panel">
                    <div>

                        <Card className="total-sum" style={{width: 300}}>
                            <Meta
                                title="Общая сумма к оплате: TODO"
                                description="Заказ будет доставлен 14 октября"
                            />
                            <Button type="primary" block className="order-button">
                                Сделать заказ
                            </Button>
                        </Card>

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
                            <Meta title="Стол компьютерный 2x1" description="$37.55"/>
                        </Card>

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
                            <Meta title="Пылесос для влажной уборки" description="$25.99"/>
                        </Card>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Bucket);


