/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-10 10:42:06
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 15:55:17
 * @Description: 
 */
import { useState } from 'react';
import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons'
import {
    Badge,
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Tag,
    Tooltip
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs'
import Label from '@/components/Label';
import ErrorType from '@/components/ErrorType';
import { PositionIcon, QualityIcon } from '@/icons/Icon';
const { RangePicker } = DatePicker

function SliceForm({ setSliceParams, errorQuality, sliceParams }) {
    const [form] = useForm()
    const [isExpand, setIsExpand] = useState(false)
    const handleExpand = () => {
        setIsExpand(!isExpand)
    }
    const onFinish = (value) => {
        setSliceParams((prev) => {
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
    const QualityContent = () => (
        <div>
            <div style={{ fontWeight: 600 }} className='pd-m-tb'>当前筛选条件范围下的数据质量：</div>
            <div className="flex items-center">
                <div style={{ width: '100px', fontWeight: 600 }}>通过率:</div>
                <div className="rate">{errorQuality.parsingRate}%</div>
            </div>
            <div className="flex justify-between items-center pd-m-tb">
                <div style={{ width: '100px', fontWeight: 600 }}>错误统计:</div>
                <div>
                    {errorQuality.errorCount.map(item => (
                        <Badge count={item.count} overflowCount={999999}>
                            <div className='flex justify-between'>
                                <Tag color='rgb(99, 66, 191)'>{item.name}</Tag>
                            </div>
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    )
    const handleProblem = () => {
        let url = '/problemDistribution?'
        const params = ['id', 'person', 'vehicleCode', 'adcm', 'path', 'location', 'eventDescription']
        params.forEach(param => url += `${param}=${sliceParams[param] || ''}&`)
        url += `labelNameList=${JSON.stringify(sliceParams.labelNameList)}&` // 标签
        const startDate = sliceParams.startDate || ''
        const endDate = sliceParams.endDate || ''
        url += `startDate=${startDate}&endDate=${endDate}` // 时间
        window.open(url, '_blank')
    }
    return (
        <Row justify="space-between">
            <Col span={20}>
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
                    <Form.Item name="datepicker">
                        <RangePicker />
                    </Form.Item>

                    {
                        isExpand && (
                            <>

                                <Form.Item name='location'>
                                    <Input placeholder='采集地' />
                                </Form.Item>
                                <Form.Item name="labelNameList">
                                    <Label />
                                </Form.Item>
                                <Form.Item name='person'>
                                    <Input placeholder='采集人' />
                                </Form.Item>
                                <Form.Item name='eventDescription'>
                                    <Input placeholder='事件描述' />
                                </Form.Item>
                                <Form.Item name="error">
                                    <ErrorType />
                                </Form.Item>
                            </>
                        )
                    }
                </Form>
            </Col>
            <Col flex="45px" className='flex justify-between items-center'>
                <Tooltip title="查看路试问题和轨迹">
                    <div onClick={handleProblem}>
                        <PositionIcon style={{ color: '#6342bf' }} className='cursor-p' />
                    </div>
                </Tooltip>
                <Tooltip title={<QualityContent />}>
                    <div><QualityIcon style={{ color: '#6342bf' }} className='cursor-p' /></div>
                </Tooltip>


            </Col>
            <Col flex="150px" className='flex justify-between'>
                <Button type="link" onClick={handleExpand} shape="circle" icon={isExpand ? <UpOutlined /> : <DownOutlined />} size='small'>{isExpand ? '关闭' : '展开'}</Button>
                <Button type='primary' onClick={handleSearch} icon={<SearchOutlined />} size='small'>Search</Button>
            </Col>
        </Row >

    );
}

export default SliceForm