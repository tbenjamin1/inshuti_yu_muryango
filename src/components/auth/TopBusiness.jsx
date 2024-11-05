// import React from 'react';
import { EditOutlined, HeartOutlined, EllipsisOutlined, SendOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import home_banner from "../images/home-banner.png"
import { Link, useNavigate } from 'react-router-dom'
const { Meta } = Card;

import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const TopBusiness = () => {
    const navigate = useNavigate();
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Top Business" key="1">
                <div className='flex justify-between items-center w-full' >
                    <Card
                        style={{
                            width: 450,
                        }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }

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
                            <EllipsisOutlined onClick={() => navigate('/register-business')} key="EllipsisOutlined" />,
                            <span
                                style={{
                                    backgroundColor: '#23419B',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    display: 'inline-flex',
                                }}
                                onClick={() => navigate('/register-business')}

                            >
                                <EditOutlined key="edit" style={{ color: 'white' }} />
                            </span>,
                        ]}
                    >

                        <div className='flex flex-col ' >
                            <span className='my-card-title' >Business Registration</span>
                            <h3 className='my-card-sub-title py-3' >Welcome to JaliKoi Business Registration – Empower Your Sales, Build Loyal Customers</h3>
                            <p className='description' >
                                Unlock the power of cashback rewards today to boost your business’s sales and create lasting customer loyalty.
                                Join JaliKoi today and transform the way you connect with customers! Our platform lets you seamlessly manage
                                cashback rewards, offering a smart way to keep customers coming back while increasing their purchasing.
                            </p>
                        </div>

                    </Card>
                    <Card
                        style={{
                            width: 450,
                        }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
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
                            <EllipsisOutlined key="EllipsisOutlined" />,
                            <span
                                style={{
                                    backgroundColor: '#23419B',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    display: 'inline-flex',
                                }}
                                onClick={() => navigate('/register-entity')}
                            >
                                <EditOutlined key="edit" style={{ color: 'white' }} />
                            </span>,
                        ]}
                    >
                        <div className='flex flex-col ' >
                            <span className='my-card-title' >FOR CHARITABLE</span>
                            <h3 className='my-card-sub-title py-3' >Welcome to JaliKoi Charitable Registration – Empower Giving, Drive Change</h3>
                            <p className='description' >
                                Join the JaliKoi community and unlock a new way for businesses and individuals to support your mission through cashback donations.
                                With JaliKoi, charitable organizations can easily connect with businesses and customers who are eager to make a difference.
                                Every transaction becomes an opportunity for impact, as users can choose to donate their cashback rewards directly to your cause
                            </p>
                        </div>
                    </Card>
                    <Card
                        style={{
                            width: 450,
                        }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
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
                            <EllipsisOutlined key="EllipsisOutlined" />,
                            <span
                                style={{
                                    backgroundColor: '#23419B',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    display: 'inline-flex',
                                }}
                                onClick={() => navigate('/login')}
                            >
                                <EditOutlined key="edit" style={{ color: 'white' }} />
                            </span>,
                        ]}
                    >
                        <div className='flex flex-col ' >
                            <span className='my-card-title' >Business Tips & Analytics</span>
                            <h3 className='my-card-sub-title py-3' >Welcome to JaliKoi Business Registration – Empower Your Sales, Build Loyal Customers</h3>
                            <p className='description' >
                                Unlock the power of cashback rewards today to boost your business’s sales and create lasting customer loyalty.
                                Join JaliKoi today and transform the way you connect with customers! Our platform lets you seamlessly manage
                                cashback rewards, offering a smart way to keep customers coming back while increasing their purchasing.
                            </p>
                        </div>
                    </Card>
                </div>
            </TabPane>
            {/* <TabPane tab="Service 2" key="2">
                <h3>Service 2</h3>
                <p>Details about Service 2 go here.</p>
            </TabPane>
            <TabPane tab="Service 3" key="3">
                <h3>Service 3</h3>
                <p>Details about Service 3 go here.</p>
            </TabPane> */}
        </Tabs>
    );
};

export default TopBusiness;
