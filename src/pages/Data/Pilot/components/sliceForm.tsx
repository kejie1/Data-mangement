/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-10 10:42:06
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 17:41:05
 * @Description: 
 */
import { useState } from 'react';
import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons'
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
} from 'antd';
import { useForm } from 'antd/es/form/Form';

function SliceForm({ onGetSliceParams }) {
    const [form] = useForm()
    const [isExpand, setIsExpand] = useState(false)
    const handleExpand = () => {
        setIsExpand(!isExpand)
    }
    const onFinish = (value) => {
        onGetSliceParams(value)
    }
    const params = {
        "postData": {
            "id": "",
            "vehicleCode": "",
            "adcm": "",
            "labelNameList": [],
            "path": "",
            "person": "",
            "location": "",
            "eventDescription": "",
            "stepSize": "",
            "eventTime": "",
            "error": [],
            "startDate": "",
            "endDate": ""
        },
        "pageNum": 1,
        "pageSize": 20
    }

    return (
        <Row justify="space-between">
            <Col span={21}>
                <Form
                    layout="inline"
                    onFinish={onFinish}
                    size='small'
                    form={form}
                >
                    <Form.Item name='id'>
                        <Input placeholder='Id' />
                    </Form.Item>
                    <Form.Item name='vehicleCode'>
                        <Input placeholder='车架号' />
                    </Form.Item>
                    <Form.Item name='adcm'>
                        <Input placeholder='ADCM版本号' />
                    </Form.Item>
                    <Form.Item name='path'>
                        <Input placeholder='路径' />
                    </Form.Item>
                    <Form.Item name='person'>
                        <Input placeholder='采集人' />
                    </Form.Item>

                    <Form.Item name="labelNameList">
                        <Select placeholder="标签">
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="datepicker">
                        <DatePicker />
                    </Form.Item>
                    {
                        isExpand && (
                            <>
                                <Form.Item name='eventDescription'>
                                    <Input placeholder='事件描述' />
                                </Form.Item>
                                <Form.Item name='location'>
                                    <Input placeholder='采集地' />
                                </Form.Item>

                                <Form.Item name="labelNameList">
                                    <Select placeholder="清洗错误">
                                        <Select.Option value="demo">Demo</Select.Option>
                                    </Select>
                                </Form.Item>
                            </>
                        )
                    }
                </Form>
            </Col>
            <Col flex="150px end">
                <Button type="link" onClick={handleExpand} shape="circle" icon={isExpand ? <UpOutlined /> : <DownOutlined />} size='small'>{isExpand ? '关闭' : '展开'}</Button>
                <Button type='primary' icon={<SearchOutlined />} size='small'>submit</Button>
            </Col>
        </Row>

    );
}

export default SliceForm