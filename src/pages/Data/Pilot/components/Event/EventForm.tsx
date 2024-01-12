/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-10 10:42:06
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 13:14:30
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
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs'
import Label from '@/components/Label';
const { RangePicker } = DatePicker
function EventForm({ setEventParams }) {
    const [form] = useForm()
    const [isExpand, setIsExpand] = useState(false)
    const handleExpand = () => {
        setIsExpand(!isExpand)
    }
    const onFinish = (value) => {
        setEventParams((prev) => {
            const newData = {
                ...prev,
                ...value,
                startDate: value.datepicker && `${dayjs(value.datepicker[0]).format('YYYY-MM-DD')} 00:00:00`,
                endDate: value.datepicker && `${dayjs(value.datepicker[1]).format('YYYY-MM-DD')} 23:59:59`,
            }
            delete newData.datepicker
            return newData
        })
    }
    const handleSearch = () => {
        form.submit()
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
                    <Form.Item name='location'>
                        <Input placeholder='采集地' />
                    </Form.Item>
                    <Form.Item name="datepicker">
                        <RangePicker />
                    </Form.Item>


                    {
                        isExpand && (
                            <>
                                <Form.Item name="labelNameList">
                                    <Label />
                                </Form.Item>
                            </>
                        )
                    }
                </Form>
            </Col>
            <Col flex="150px" className='flex justify-between'>
                <Button type="link" onClick={handleExpand} shape="circle" icon={isExpand ? <UpOutlined /> : <DownOutlined />} size='small'>{isExpand ? '关闭' : '展开'}</Button>
                <Button type='primary' onClick={handleSearch} icon={<SearchOutlined />} size='small'>Search</Button>
            </Col>
        </Row>

    );
}

export default EventForm