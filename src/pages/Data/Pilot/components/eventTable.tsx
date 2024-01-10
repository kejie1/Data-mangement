/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-10 11:48:25
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 17:41:23
 * @Description: 
 */
import { Select, Table, Tag, Space, Button } from 'antd';
import { event } from './data'
import '@/assets/style/global.scss'
import { EventResponse } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import { InsertRowLeftOutlined } from '@ant-design/icons'

const EventTable = ({ list, onGetPagination }) => {
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
    const paginationProps = {
        current: event.currentIndex, //当前页码
        pageSize: event.pageCount, // 每页数据条数
        total: event.total, // 总条数
        onChange: page => onGetPagination('event', page), //改变页码的函数
        hideOnSinglePage: false,  // 只有一页时是否隐藏分页器
    };
    const handleCheckSlice = (row: EventResponse) => {
        // 
    }
    const getSliceByTime = (row: EventResponse) => {
        // 
    }
    const EventTableSchema: ColumnsType<EventResponse> = [
        {
            title: '车架号',
            dataIndex: 'vehicleCode',
            key: 'vehicleCode',
        },
        {
            title: 'ADCM版本号',
            dataIndex: 'adcm',
            key: 'adcm',
        },
        {
            title: '版本号',
            dataIndex: 'version',
            key: 'version',
        },
        {
            title: '事件时间',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
        },
        {
            title: '标签',
            dataIndex: 'labels',
            key: 'labels',
            ellipsis: {
                showTitle: true,
            },
            render: (_, { label }) => (
                <>
                    {label.map((item, index) => (
                        <Tag key={index} color='purple'>{item.name}</Tag>
                    ))}
                </>
            )
        },
        {
            title: '事件描述',
            dataIndex: 'eventDescription',
            key: 'eventDescription',
            ellipsis: {
                showTitle: true,
            },
        },
        {
            title: '附近时间的切片',
            dataIndex: 'events',
            key: 'events',
            ellipsis: {
                showTitle: true,
            },
            render: (_, record) => (
                <Select
                    placeholder="选择时间"
                    style={{ width: 120 }}
                    allowClear
                    size='small'
                    options={[
                        { value: '1', label: '1min' },
                        { value: '5', label: '5min' },
                        { value: '10', label: '10min' },
                        { value: '20', label: '20min' },
                        { value: '30', label: '30min' },
                    ]}
                    onChange={() => { getSliceByTime(record) }}
                />
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 0,
            render: (_, record) => (
                <Space size="small">
                    <Button size='small' type='primary' onClick={() => { handleCheckSlice(record) }} icon={<InsertRowLeftOutlined />}></Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table columns={EventTableSchema} dataSource={list} pagination={paginationProps} scroll={{ y: '35vh' }} size="small" rowKey='id' />
        </>
    )
}

export default EventTable;