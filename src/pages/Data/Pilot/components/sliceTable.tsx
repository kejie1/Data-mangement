/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-10 11:48:25
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 17:27:20
 * @Description: 
 */
/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-10 11:48:25
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 14:19:27
 * @Description: 
 */
import { Button, Table, ConfigProvider, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { slice } from './data'
import { tableToken } from './common';
import { SliceResponse } from '@/types';
import { PlayCircleOutlined, CloudDownloadOutlined } from '@ant-design/icons'

const SliceTable = ({ list, onGetPagination }) => {
    const paginationProps = {
        current: 1, //当前页码
        pageSize: 20, // 每页数据条数
        total: slice.total, // 总条数
        onChange: page => onGetPagination(page), //改变页码的函数
        hideOnSinglePage: false,  // 只有一页时是否隐藏分页器
    };
    const handleJumpDreamer = (row: SliceResponse) => {
        // 
    }
    const handleFileDown = (row: SliceResponse) => {
        // 
    }
    const SliceTableSchema: ColumnsType<SliceResponse> = [
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
            title: '开始时间',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: '标签',
            dataIndex: 'labels',
            key: 'labels',
            ellipsis: {
                showTitle: true,
            },
            render: (_, { labels }) => (
                <>
                    {labels.map((label, index) => (
                        <Tag key={index} color='purple'>{label.name}</Tag>
                    ))}
                </>
            )
        },
        {
            title: '',
            dataIndex: 'isImmediate',
            key: 'isImmediate',
            render: (isImmediate) => (
                <>
                    {isImmediate && <Tag color='purple'>及时</Tag>}
                </>
            )
        },
        {
            title: '清洗错误',
            dataIndex: 'errors',
            key: 'errors',
            ellipsis: {
                showTitle: true,
            },
            render: (_, { errors }) => (
                <>
                    {errors[0]}
                </>
            )
        },
        {
            title: '事件描述',
            dataIndex: 'events',
            key: 'events',
            ellipsis: {
                showTitle: true,
            },
            render: (_, { events }) => (
                <>
                    {events[0]?.event_description}
                </>
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Space size="small">
                    <Button size='small' type='primary' onClick={() => { handleJumpDreamer(record) }} icon={<PlayCircleOutlined />}></Button>
                    <Button size='small' type='primary' onClick={() => { handleFileDown(record) }} icon={<CloudDownloadOutlined />}></Button>
                </Space>
            ),
        },
    ];
    return (
        <ConfigProvider theme={{ components: { Table: tableToken } }}>

            <Table columns={SliceTableSchema} pagination={paginationProps} scroll={{ y: '35vh' }} dataSource={list} size="small" rowKey='id' />
        </ConfigProvider>
    )
}

export default SliceTable