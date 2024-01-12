/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-10 11:48:25
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 16:14:06
 * @Description: 
 */
import { Select, Table, Tag, Space, Button, Tooltip, ConfigProvider } from 'antd';
import '@/assets/style/global.scss'
import { EventResponse } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import { InsertRowLeftOutlined } from '@ant-design/icons'
import type { EventResponseData, SliceSearch, Page } from '@/types'
import { tableToken } from '../common';
interface EventTableType {
    response: EventResponseData,
    setEventOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setEventId: React.Dispatch<React.SetStateAction<string>>,
    eventPage: Page
    setEventPage: React.Dispatch<React.SetStateAction<Page>>,
    setSliceParams: React.Dispatch<React.SetStateAction<SliceSearch>>,
}
const EventTable: React.FC<EventTableType> = ({ eventPage, setEventPage, response, setEventId, setEventOpen, setSliceParams }) => {
    const list = response?.results
    const paginationProps = {
        current: eventPage.pageNum, //当前页码
        pageSize: eventPage.pageSize, // 每页数据条数
        total: response?.total, // 总条数
        onChange: pageNum => setEventPage({ ...eventPage, pageNum }), //改变页码的函数
        onShowSizeChange: (current, pageSize) => setEventPage({ ...eventPage, pageSize }), // 改变pageSize
        hideOnSinglePage: false,  // 只有一页时是否隐藏分页器
    };
    const handleCheckSlice = (record: EventResponse) => {
        console.log("🚀 ~ handleCheckSlice ~ record:", record)
        const { vehicleCode, eventTime } = record
        setSliceParams({ vehicleCode, eventTime, stepSize: '0' })
    }
    const handleDoubleClick = (record) => {
        setEventId(record.id)
        setEventOpen(true)
    }
    const handleSelectClear = () => {
        console.log('clear')
        setSliceParams((prev) => {
            const newData = {}
            for (const key in prev) {
                if (Object.prototype.hasOwnProperty.call(prev, key)) {
                    newData[key] = ''
                }
            }
            console.log("🚀 ~ setSliceParams ~ newData:", newData)
            return { ...prev, ...newData }
        })
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
                    onSelect={() => { handleCheckSlice(record) }}
                    onClear={handleSelectClear}
                />
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 80,
            render: (_, record) => (
                <Space size="small">
                    <Tooltip placement='top' title="一键查看对应切片">
                        <Button size='small' type='primary' onClick={() => { handleCheckSlice(record) }} icon={<InsertRowLeftOutlined />} />
                    </Tooltip>
                </Space>
            ),
        },
    ];
    return (
        <ConfigProvider theme={{ components: { Table: tableToken } }}>
            <Table onRow={(record) => {
                return {
                    onDoubleClick: () => { handleDoubleClick(record) }
                }
            }}
                columns={EventTableSchema}
                dataSource={list}
                pagination={paginationProps}
                scroll={{ y: '35vh' }}
                size="small" rowKey='id'
            />
        </ ConfigProvider>
    )
}

export default EventTable;