import React from 'react';
import { EditOutlined, HeartOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, Tabs, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import cashback from "../images/cashback.png"
import wallet from "../images/wallet.png"
import Coins_amico from "../images/Coins_amico.png"

const { TabPane } = Tabs;
const { Meta } = Card;

const TopBusiness = ({ allBussinessesRegisteredList }) => {
    console.log('allBussinessesRegisteredList', allBussinessesRegisteredList)
    const navigate = useNavigate();

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Top Business" key="1">
                <Row gutter={[16, 16]}>
                    {allBussinessesRegisteredList.slice(0, 3).map((business) => (
                        <Col xs={24} sm={12} md={12} lg={8} key={business.id}>
                            <Card className='top-bussines-card'  style={{ height: 300 }}
                                cover={<img className='img' alt={business.name} src={business.icon ? business.icon : Coins_amico} />}
                                
                            >

                                <div>
                                    <span className='capitalize font-bold' > {business.name} </span>
                                    <p className='capitalize description' >Category: {business.category.name}</p>
                                    {/* <p className='description' >Contact Tel: {business.contact_tel}</p> */}
                                    <p className='description' >Status: {business.status}</p>
                                    <p className='description' >Reward Type: {business.reward_type}</p>
                                    <p className='description' >Reward Percentage: {business.reward_percentage}%</p>
                                </div>
                                
                            </Card>
                        </Col>
                    ))}
                </Row>
            </TabPane>
        </Tabs>
    );
};

export default TopBusiness;
