import React, { useEffect, useState } from 'react';
import { Tabs, Row, Col, Card, Spin } from 'antd';
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
        <Tabs defaultActiveKey="1">
            <TabPane tab="Top Business" className="top-bussines-card-spineer" key="1">
                <Spin spinning={loading}  tip="Loading businesses...">
                    <Row gutter={[16, 16]}>
                        {allBussinessesRegisteredList.slice(0, 4).map((business) => (
                            <Col xs={24} sm={12} md={12} lg={6} key={business.id}>
                                <Card
                                    className="top-bussines-card"
                                    style={{ height: 300 }}
                                >
                                    <div>
                                        <div className="bussiness-logo mb-3">
                                            <img
                                                className="bussiness-logo-img"
                                                alt={business.name}
                                                src={business.icon ? business.icon : Coins_amico}
                                            />
                                        </div>
                                        <span className="capitalize font-bold">{business.name}</span>
                                        <p className="capitalize description">Category: {business.category.name}</p>
                                        <p className="description">Status: {business.status}</p>
                                        <p className="description">Reward Type: {business.reward_type}</p>
                                        <p className="description">Reward Percentage: {business.reward_percentage}%</p>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Spin>
            </TabPane>
        </Tabs>
    );
};

export default TopBusiness;
