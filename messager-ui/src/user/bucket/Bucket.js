import React, {Component} from 'react'
import './Bucket.css';
import {Route, withRouter, Redirect} from "react-router-dom";
import {Table, Col, Row, Skeleton, Switch, Card, Icon, Avatar, Button} from 'antd';

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

const tableClass = 'omg';

class Bucket extends Component {
    state = {
        query: '',
        users: [],
        lastParticipants: []
    };

    constructor(props) {
        super(props);
    }

    onChange = checked => {
        this.setState({loading: !checked});
    };


    render() {

        return (
            <Row type="flex" justify="space-between">
                <Col span={18} className="order-table">
                    <h2>Моя корзина</h2>
                    < Table
                        rowSelection={rowSelection}
                        dataSource={data}
                    >
                        <Column title="Наименование товара" dataIndex="name" key="firstName"/>
                        <Column title="Стоимость" dataIndex="age" key="age"/>
                        <Column title="Дата поступления на склад" dataIndex="address" key="address"/>
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

                        <Card style={{width: 300}}>
                            <Meta
                                title="Общая сумма к оплате: TODO"
                                description="Заказ будет доставлен 14 октября"
                            />
                            <Button type="primary" block className="order-button">
                                Сделать заказ
                            </Button>
                        </Card>

                        <Card
                            style={{width: 300, marginTop: 16}}
                            actions={[
                                <Icon type="setting" key="setting"/>,
                                <Icon type="edit" key="edit"/>,
                                <Icon type="ellipsis" key="ellipsis"/>,
                            ]}
                        >

                        </Card>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Bucket);


