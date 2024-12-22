import React from "react";
import { Row, Col, Tabs, Card, Button } from "antd";
const { TabPane } = Tabs;

const AboutUsSection = () => {
    return (
        <Tabs defaultActiveKey="1" className="top-business-container" >
            <TabPane tab="About Us" className="top-bussines-card-spineer flex justify-center items-center" key="1">
                <div className="about-us-section flex flex-col justify-center items-center">
                   
                    {/* Top Row: Vision, Mission, and Promise */}
                    <div className="about-us-section">
                        
                        <Row gutter={[24, 24]} justify="center">
                            {/* Vision Card */}
                            <Col xs={24} sm={12} md={8}>
                                <div className="custom-card">
                                    <div className="image-container">
                                        <img
                                            alt="Our Vision"
                                            src="https://www.houseyog.com/images/house-construction-kolkata-bimg2.jpg" // Replace with actual image URL
                                            className="card-image"
                                        />
                                    </div>
                                    <h3 className="card-title">Our Vision</h3>
                                    <p className="card-description">
                                        Epoxy paint and epoxy floor contractor. Have you heard the two
                                        terms? And what does that have to do with the construction of
                                        existing buildings? Epoxy itself is included in the...{" "}
                                        <a href="#">Read more</a>
                                    </p>
                                </div>
                            </Col>

                            {/* Mission Card */}
                            <Col xs={24} sm={12} md={8}>
                                <div className="custom-card">
                                    <div className="image-container">
                                        <img
                                            alt="Our Mission"
                                            src="https://content.jdmagicbox.com/comp/varanasi/v7/0542px542.x542.191010161000.s2v7/catalogue/royal-way-building-design-and-construction-pahariya-varanasi-structural-designers-lll2ol7sjh.jpg" // Replace with actual image URL
                                            className="card-image"
                                        />
                                    </div>
                                    <h3 className="card-title">Our Mission</h3>
                                    <p className="card-description">
                                        Planning the construction of a warehouse for both industrial,
                                        personal, and other goods storage must be done carefully. When the
                                        planning is done properly, the...{" "}
                                        <a href="#">Read more</a>
                                    </p>
                                </div>
                            </Col>

                            {/* Promise Card */}
                            <Col xs={24} sm={12} md={8}>
                                <div className="custom-card">
                                    <div className="image-container">
                                        <img
                                            alt="We Promise"
                                            src="https://www.houseyog.com/images/house-construction-kolkata-bimg2.jpg" // Replace with actual image URL
                                            className="card-image"
                                        />
                                    </div>
                                    <h3 className="card-title">We Promise, We Care, We Deliver</h3>
                                    <p className="card-description">
                                        Having a solid home is certainly everyone's dream. How not, the
                                        house is a place where the residents can rest and take shelter
                                        from the bad weather... <a href="#">Read more</a>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Bottom Row: Our Story */}
                    <Row gutter={[24, 24]} justify="center" className="" style={{ marginTop: "100px" }}>
                        <Col xs={24} sm={24} md={12} className="  flex flex-col justify-between items-stretch " >
                            <div className="our-story w-full mb-2" >
                                <h2 className="Our_Story" >Our Story</h2>
                                <h3 className="Our_Story" >Who We Are</h3>
                            </div>

                            <div  className="" >
                               
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, eius vitae deleniti ipsam obcaecati molestiae ipsum, dolorem ullam quos veniam voluptate magnam nam soluta doloremque. Vero laboriosam facilis error! Mollitia.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, eius vitae deleniti ipsam obcaecati molestiae ipsum, dolorem ullam quos veniam voluptate magnam nam soluta doloremque. Vero laboriosam facilis error! Mollitia.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, eius vitae deleniti ipsam obcaecati molestiae ipsum, dolorem ullam quos veniam voluptate magnam nam soluta doloremque. Vero laboriosam facilis error! Mollitia.
                                </p>
                                
                            </div>
                            <div className="mt-3" >
                                <Button type="primary">See More</Button>
                            </div>
                        </Col>

                        <Col xs={24} sm={24} md={12}>
                            <img
                                alt="Our Story"
                                src="https://content.jdmagicbox.com/comp/varanasi/v7/0542px542.x542.191010161000.s2v7/catalogue/royal-way-building-design-and-construction-pahariya-varanasi-structural-designers-lll2ol7sjh.jpg" // Replace with your image URL
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </Col>
                    </Row>

                </div>

            </TabPane>
        </Tabs>);
};

export default AboutUsSection;
