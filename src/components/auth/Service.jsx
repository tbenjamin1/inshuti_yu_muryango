import React from 'react';
import { EditOutlined, HeartOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, Tabs, Row, Col } from 'antd';
import cashback from "../images/cashback.png";
import wallet from "../images/wallet.png";
import Coins_amico from "../images/Coins_amico.png";
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;
const { Meta } = Card;

const ServicesTabs = () => {
    const navigate = useNavigate();

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Best Packages For You" key="1">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={8}>
                        <Card
                            cover={<img className='img' alt="Business Registration" src={Coins_amico} />}
                            actions={[
                                <span
                                    style={{
                                        backgroundColor: '#23419B',
                                        padding: '8px',
                                        borderRadius: '50%',
                                        display: 'inline-flex',
                                    }}
                                >
                                    <HeartOutlined style={{ color: 'white' }} />
                                </span>,
                                <EllipsisOutlined onClick={() => navigate('/register-business')} key="ellipsis" />,
                                <span className='text-white rounded-lg px-4 py-1'
                                    style={{
                                        backgroundColor: '#23419B',
                                        display: 'inline-flex',
                                    }}
                                    onClick={() => navigate('/register-business')}
                                >
                                    <span className='uppercase'>Register</span>
                                </span>
                            ]}
                        >
                            <Meta
                                title="Business Registration"
                                description={(
                                    <>
                                        <h3 className='my-card-sub-title py-3'>Welcome to JaliKoi Business Registration – Empower Your Sales, Build Loyal Customers</h3>
                                        <p className='description'>
                                            Unlock the power of cashback rewards today to boost your business’s sales and create lasting customer loyalty.
                                            Join JaliKoi today and transform the way you connect with customers!
                                        </p>
                                    </>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8}>
                        <Card
                            cover={<img className='img' alt="Charitable Registration" src={cashback} />}
                            actions={[
                                <span
                                    style={{
                                        backgroundColor: '#23419B',
                                        padding: '8px',
                                        borderRadius: '50%',
                                        display: 'inline-flex',
                                    }}
                                >
                                    <HeartOutlined style={{ color: 'white' }} />
                                </span>,
                                <EllipsisOutlined onClick={() => navigate('/register-entity')} key="ellipsis" />,
                                <span className='text-white rounded-lg px-4 py-1'
                                    style={{
                                        backgroundColor: '#23419B',
                                        display: 'inline-flex',
                                    }}
                                    onClick={() => navigate('/register-entity')}
                                >
                                    <span className='uppercase'>Register</span>
                                </span>
                            ]}
                        >
                            <Meta
                                title="FOR CHARITABLE"
                                description={(
                                    <>
                                        <h3 className='my-card-sub-title py-3'>Welcome to JaliKoi Charitable Registration – Empower Giving, Drive Change</h3>
                                        <p className='description'>
                                            Join the JaliKoi community and unlock a new way for businesses and individuals to support your mission through cashback donations.
                                        </p>
                                    </>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8}>
                        <Card
                            cover={<img className='img' alt="Referral Program" src={wallet} />}
                            actions={[
                                <span
                                    style={{
                                        backgroundColor: '#23419B',
                                        padding: '8px',
                                        borderRadius: '50%',
                                        display: 'inline-flex',
                                    }}
                                >
                                    <HeartOutlined style={{ color: 'white' }} />
                                </span>,
                                <EllipsisOutlined onClick={() => navigate('/referee-page')} key="ellipsis" />,
                                <span className='text-white rounded-lg px-4 py-1'
                                    style={{
                                        backgroundColor: '#23419B',
                                        display: 'inline-flex',
                                    }}
                                    onClick={() => navigate('/referee-page')}
                                >
                                    <span className='uppercase'>Register</span>
                                </span>
                            ]}
                        >
                            <Meta
                                title="Referral Program"
                                description={(
                                    <>
                                        <h3 className='my-card-sub-title py-3'>Join Koipay's Referral Program and Multiply Your Rewards!</h3>
                                        <p className='description'>
                                            Refer, Earn, and Give Back with Koipay! Invite your friends to join and earn cash back every time they use our platform.
                                        </p>
                                    </>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    );
};

export default ServicesTabs;
