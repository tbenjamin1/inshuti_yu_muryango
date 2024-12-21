import React, { useEffect, useState } from 'react';
import { Tabs, Row, Col, Card, Button,Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import Coins_amico from "../images/Coins_amico.png";


const { TabPane } = Tabs;

const TopBusiness = ({ allBussinessesRegisteredList }) => {
    const navigate = useNavigate();

    // Loading state to track data fetching
    const [loading, setLoading] = useState(true);

    // Simulate data fetching
    useEffect(() => {
        if (allBussinessesRegisteredList && allBussinessesRegisteredList.length > 0) {
            setLoading(false); // Stop loader when data is available
        }
    }, [allBussinessesRegisteredList]);

    return (
        <Tabs defaultActiveKey="1" className='px-4  top-business-container' >
            <TabPane tab="Our Product / Best Packages For You" className="top-bussines-card-spineer" key="1">
               
                    <Row gutter={[16, 16]}>
                       
                            <Col xs={24} sm={12} md={12} lg={6} key='1'>
                                <Card
                                    className="top-bussines-card"
                                    style={{ height: 300 }}
                                >
                                    <div className='' >
                                        <div className="bussiness-logo mb-3">
                                            <img
                                                className="bussiness-logo-img"
                                           
                                                src="https://content.jdmagicbox.com/comp/varanasi/v7/0542px542.x542.191010161000.s2v7/catalogue/royal-way-building-design-and-construction-pahariya-varanasi-structural-designers-lll2ol7sjh.jpg" 
                                            />
                                        </div>
                                       <div className='flex flex-col px-3' >
                                            <span className="capitalize font-bold">Product name</span>
                                            <p className="capitalize description">Category </p>
                                            <p className="description">Status: Available</p>
                                       </div>
                                    </div>
                                </Card>
                            </Col>

                    <Col xs={24} sm={12} md={12} lg={6} key='2'>
                        <Card
                            className="top-bussines-card"
                            style={{ height: 300 }}
                        >
                            <div className='' >
                                <div className="bussiness-logo mb-3">
                                    <img
                                        className="bussiness-logo-img"
                                       
                                        src="https://content.jdmagicbox.com/comp/varanasi/v7/0542px542.x542.191010161000.s2v7/catalogue/royal-way-building-design-and-construction-pahariya-varanasi-structural-designers-lll2ol7sjh.jpg"
                                    />
                                </div>
                                <div className='flex flex-col px-3' >
                                    <span className="capitalize font-bold">Product name</span>
                                    <p className="capitalize description">Category </p>
                                    <p className="description">Status: Available</p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                        
                    <Col xs={24} sm={12} md={12} lg={6} key='3'>
                        <Card
                            className="top-bussines-card"
                            style={{ height: 300 }}
                        >
                            <div className='' >
                                <div className="bussiness-logo mb-3">
                                    <img
                                        className="bussiness-logo-img"

                                        src="https://content.jdmagicbox.com/comp/varanasi/v7/0542px542.x542.191010161000.s2v7/catalogue/royal-way-building-design-and-construction-pahariya-varanasi-structural-designers-lll2ol7sjh.jpg"
                                    />
                                </div>
                                <div className='flex flex-col px-3' >
                                    <span className="capitalize font-bold">Product name</span>
                                    <p className="capitalize description">Category </p>
                                    <p className="description">Status: Available</p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} key='4'>
                        <Card
                            className="top-bussines-card"
                            style={{ height: 300 }}
                        >
                            <div className='' >
                                <div className="bussiness-logo mb-3">
                                    <img
                                        className="bussiness-logo-img"

                                        src="https://content.jdmagicbox.com/comp/varanasi/v7/0542px542.x542.191010161000.s2v7/catalogue/royal-way-building-design-and-construction-pahariya-varanasi-structural-designers-lll2ol7sjh.jpg"
                                    />
                                </div>
                                <div className='flex flex-col px-3' >
                                    <span className="capitalize font-bold">Product name</span>
                                    <p className="capitalize description">Category </p>
                                    <p className="description">Status: Available</p>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={6} key='5'>
                        <Card
                            className="top-bussines-card"
                            style={{ height: 300 }}
                        >
                            <div className='' >
                                <div className="bussiness-logo mb-3">
                                    <img
                                        className="bussiness-logo-img"

                                        src="https://content.jdmagicbox.com/comp/varanasi/v7/0542px542.x542.191010161000.s2v7/catalogue/royal-way-building-design-and-construction-pahariya-varanasi-structural-designers-lll2ol7sjh.jpg"
                                    />
                                </div>
                                <div className='flex flex-col px-3' >
                                    <span className="capitalize font-bold">Product name</span>
                                    <p className="capitalize description">Category </p>
                                    <p className="description">Status: Available</p>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={6} key='6'>
                        <Card
                            className="top-bussines-card"
                            style={{ height: 300 }}
                        >
                            <div className='' >
                                <div className="bussiness-logo mb-3">
                                    <img
                                        className="bussiness-logo-img"

                                        src="https://content.jdmagicbox.com/comp/varanasi/v7/0542px542.x542.191010161000.s2v7/catalogue/royal-way-building-design-and-construction-pahariya-varanasi-structural-designers-lll2ol7sjh.jpg"
                                    />
                                </div>
                                <div className='flex flex-col px-3' >
                                    <span className="capitalize font-bold">Product name</span>
                                    <p className="capitalize description">Category </p>
                                    <p className="description">Status: Available</p>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={6} key='8'>
                        <Card
                            className="top-bussines-card"
                            style={{ height: 300 }}
                        >
                            <div className='' >
                                <div className="bussiness-logo mb-3">
                                    <img
                                        className="bussiness-logo-img"

                                        src="https://content.jdmagicbox.com/comp/varanasi/v7/0542px542.x542.191010161000.s2v7/catalogue/royal-way-building-design-and-construction-pahariya-varanasi-structural-designers-lll2ol7sjh.jpg"
                                    />
                                </div>
                                <div className='flex flex-col px-3' >
                                    <span className="capitalize font-bold">Product name</span>
                                    <p className="capitalize description">Category </p>
                                    <p className="description">Status: Available</p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    </Row>
                    <div className='flex justify-center items-center pt-5' >
                        <Button type="primary">Load More</Button>
                    </div>
            
            </TabPane>
        </Tabs>
    );
};

export default TopBusiness;