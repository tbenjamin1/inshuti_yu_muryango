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
    const navigate = useNavigate();

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Top Business" key="1">
                <Row gutter={[16, 16]}>
                    {allBussinessesRegisteredList.slice(0, 4).map((business) => (
                        <Col xs={24} sm={12} md={12} lg={6} key={business.id}>
                            <Card
                                cover={<img className='img' alt={business.name} src={business.icon ? business.icon : Coins_amico} />}
                                actions={[
                                    <span
                                        style={{
                                            // backgroundColor: '#23419B',
                                            padding: '8px',
                                            borderRadius: '50%',
                                            display: 'inline-flex',
                                        }}
                                        key="heart"
                                    >
                                        {/* <HeartOutlined style={{ color: 'white' }} /> */}
                                    </span>
                                    ,
                                    <EllipsisOutlined onClick={() => navigate('/')} key="ellipsis" />,
                                    <span
                                        style={{
                                            // backgroundColor: '#23419B',
                                            padding: '8px',
                                            borderRadius: '50%',
                                            display: 'inline-flex',
                                        }}
                                        onClick={() => navigate('/')}
                                        key="edit"
                                    >
                                        {/* <EditOutlined style={{ color: 'white' }} /> */}
                                    </span>,
                                ]}
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
