import React, { useEffect, useState } from 'react'
import DashboardLayout from "../DashboardLayout";
import { Tabs } from 'antd';
import { useDispatch, useSelector } from "react-redux";

import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Image, Upload, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';


import { fetchAsynProviders, getAllProviders } from '../../../redux/transactions/TransactionSlice';
import ImageUploadProviderImage from './ImageUploadProviderImage';

const { TabPane } = Tabs;

const UssdProviders = () => {
    const dispatch = useDispatch();
    const allProviders = useSelector(getAllProviders);
    console.log('allProviders', allProviders)

    const [open, setOpen] = useState(false);
    const [openUssd, setOpenUssd] = useState(false);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const showUsddDrawer = () => {
        setOpenUssd(true);
    };

    const onUssdClose = () => {
        setOpenUssd(false);
    };
    
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    const [values, setValues] = useState([]);

    const handleMulitChange = (newValues) => {
        setValues(newValues);
    };
    useEffect(() => {

        dispatch(fetchAsynProviders())

    }, [dispatch]);

    return (
        <DashboardLayout>
            <div className="ussd-providers-container flex  justify-center ">
                <div className="providers-container ">
                     <Tabs defaultActiveKey="1" tabPosition="top" type="card">
                        <TabPane tab="high bytes products" className='mt-3' key="1">
                            <div>
                                <div className='flex justify-between items-center py-5 bg-white px-4' >
                                    <Select
                                        showSearch
                                        placeholder="Select a filter"
                                        optionFilterProp="label"
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        options={[
                                            {
                                                value: 'Pending',
                                                label: 'Pending',
                                            },
                                            {
                                                value: 'Active',
                                                label: 'Active',
                                            },
                                            {
                                                value: 'Inactive',
                                                label: 'Inactive',
                                            },
                                        ]}
                                    />
                                    <Button type="primary" onClick={showDrawer} >
                                        <div className='flex justify-between items-center' >
                                            <PlusOutlined /> <span className='pl-2'> New Product</span>
                                        </div>
                                    </Button>
                                </div>
                                {allProviders &&   <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
                                        <tr>
                                            <th scope="col" className="px-2 py-3">
                                              Provider
                                            </th>
                                            <th scope="col" className="px-1 py-3">
                                                prefix
                                            </th>
                                            <th scope="col" className="px-1 py-3">
                                                created_At
                                            </th>
                                            <th scope="col" className="px-1 py-3">
                                                Status
                                            </th>
                                            <th scope="col" className="px-1 py-3">
                                                V VGX count
                                            </th>
                                           
                                            <th scope="col" className="px-1 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                     { (allProviders.map((provider, index) => ( 
                                          <tr className="bg-white border-b hover:bg-gray-50 "  >
                                            <td className="w-4 p-4">
                                               <div className='capitalize px-3' >
                                                    product.name
                                               </div>
                                            </td>
                                            <td className="px-6 py-4">
                                             {provider.prefix}
                                            </td>
                                            <td className="px-6 py-4">
                                             {provider.createdAt}
                                            </td>
                                            <td className="px-6 py-4">
                                             {provider.published ? 'published' :'Unpublished'}
                                            </td>
                                            <td className="px-6 py-4">
                                             {provider.ussd.length }
                                            </td>
                                            
                                            <td className="px-6 py-4" >
                                                <Button type="primary" onClick={showUsddDrawer} >
                                                    <div className='flex justify-between items-center' >
                                                        <PlusOutlined /> <span className='pl-2'> View Product  </span>
                                                    </div>
                                                </Button>
                                            </td>
                                        </tr>)))}
                                       
                                    </tbody>
                                </table>}
                            </div>
                        </TabPane>
                        {/* <TabPane tab="PROVIDERS USSD" key="2">
                            <div>Content of Tab Pane 2</div>
                        </TabPane> */}
                        {/* <TabPane tab="Tab 3" key="3">
                        <div>Content of Tab Pane 3</div>
                    </TabPane> */}
                    </Tabs>
                </div>
            </div>


            <Drawer
                title="Create a new USSD"
                width={720}
                onClose={onUssdClose}
                open={openUssd}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onUssdClose}>Cancel</Button>
                        <Button onClick={onUssdClose} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Title"
                                label="Title"
                                rules={[{ required: true, message: 'Please enter title' }]}
                            >
                                <Input placeholder="Title" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="provider"
                                label="provider"
                                rules={[{ required: true, message: 'Please enter provider' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a provider"
                                    optionFilterProp="label"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    options={[
                                        {
                                            value: 'MTN',
                                            label: 'MTN',
                                        },
                                        {
                                            value: 'Airtel',
                                            label: 'Airtel',
                                        },
                                        
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="type"
                                rules={[{ required: true, message: 'Please select an type' }]}
                            >
                                <Select placeholder="Please select type">
                                    <Option value="xiao">Code</Option>
                                    <Option value="mao">Phone Number </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="USSD Short code"
                                label="USSD Short code"
                                rules={[{ required: true, message: 'Please Enter the code' }]}
                            >
                                <Input placeholder="USSD code" />
                            </Form.Item>
                        </Col>
                    </Row>
                  
                            <div className='USSD_Fields  py-4 border-b-2 border-blue-800 my-3 rounded-md px-3  w-full' >
                                USSD Fields
                            </div>
                            
                        

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="input"
                                label="Field Input type"
                                rules={[{ required: true, message: 'Please enter input' }]}
                            >
                                <Input placeholder="Field input type" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="field type"
                                label="Field type"
                                rules={[{ required: true, message: 'Please Enter the field type' }]}
                            >
                                <Input placeholder="Field type" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="place holder"
                                label="Place holder"
                                rules={[{ required: true, message: 'Please enter place holder' }]}
                            >
                                <Input placeholder="place holder " />
                            </Form.Item>
                        </Col>
                        <Col span={12} className=' flex justify-end items-center' >
                          <div className='' >
                                <Button onClick={onUssdClose} type="primary">
                                    Save Field
                                </Button>
                          </div>
                        </Col>
                    </Row>
                    
                </Form>
            </Drawer>


            <Drawer
                title="Create a new Provider"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Provider name"
                                label="Provider Name"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                            <Form.Item
                                name="prefix"
                                label="prefix"
                                rules={[{ required: true, message: 'Please select an owner' }]}
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Enter multiple values"
                                    value={values}
                                    onChange={handleMulitChange}
                                    tokenSeparators={[',']}
                                >
                                    {values.map((value) => (
                                        <Option key={value}>{value}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                           <div className='flex justify-end' >
                                <Form.Item
                                    name="Provider Logo"
                                    label="Provider Logo"
                                    rules={[{ required: true, message: 'Please enter image' }]}
                                >
                                    <ImageUploadProviderImage />
                                </Form.Item>
                           </div>
                        </Col>
                    </Row>
                   
                
                </Form>
            </Drawer>
        </DashboardLayout>
    );
};

export default UssdProviders;
