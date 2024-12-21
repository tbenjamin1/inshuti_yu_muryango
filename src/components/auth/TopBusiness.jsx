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
                <Spin spinning={loading}  tip="Loading businesses...">
                    <Row gutter={[16, 16]}>
                        {allBussinessesRegisteredList.slice(0,10).map((business) => (
                            <Col xs={24} sm={12} md={12} lg={6} key={business.id}>
                                <Card
                                    className="top-bussines-card"
                                    style={{ height: 300 }}
                                >
                                    <div className='' >
                                        <div className="bussiness-logo mb-3">
                                            <img
                                                className="bussiness-logo-img"
                                                alt={business.name}
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
                        ))}
                    </Row>
                    <div className='flex justify-center items-center pt-5' >
                        <Button type="primary">Load More</Button>
                    </div>
                </Spin>
            </TabPane>
        </Tabs>
    );
};

export default TopBusiness;