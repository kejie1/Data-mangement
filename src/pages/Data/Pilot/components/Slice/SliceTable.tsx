/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-10 11:48:25
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 14:45:45
 * @Description: 
 */
import { Button, Table, ConfigProvider, Tag, Space, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { tableToken } from '../common';
import { SliceResponse, SliceResponseData } from '@/types';
import { PlayCircleOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import type { Page } from '@/types'
import { getSliceObsKeyAPI } from '@/apis';
import { getUserId } from '@/utils';
interface SliceTableType {
    response: SliceResponseData,
    setSlicePage: React.Dispatch<React.SetStateAction<Page>>
    slicePage: Page,
    setSliceOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSliceId: React.Dispatch<React.SetStateAction<string>>
}
const SliceTable: React.FC<SliceTableType> = ({ response, slicePage, setSlicePage, setSliceOpen, setSliceId }) => {
    const list = response?.results
    const paginationProps = {
        current: slicePage.pageNum, //当前页码
        pageSize: slicePage.pageSize, // 每页数据条数
        total: response?.total, // 总条数
        onChange: pageNum => setSlicePage({ ...slicePage, pageNum }), //改变页码的函数
        onShowSizeChange: (current, pageSize) => setSlicePage({ ...slicePage, pageSize }), // 改变pageSize
        hideOnSinglePage: false,  // 只有一页时是否隐藏分页器
    };
    const handleJumpDreamer = (record: SliceResponse) => {
        getSliceObsKeyAPI(record.id).then(res => {
            const { obsBucket, obsKey } = res.data
            const url = `${import.meta.env.VITE_DREAMER_URL}?model=highspeed&obsBucket=${obsBucket}&obs=${obsKey}`
            window.open(url, '_blank')
        })
    }
    const handleFileDown = (record: SliceResponse) => {
        window.open(`${import.meta.env.VITE_APP_BASE_API}v1/ori/getIdSegmentZip/${record.id}/${getUserId()}`, "_blank")
    }
    const handleDbClick = (record) => {
        setSliceId(record.id)
        setSliceOpen(true)
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
                    <Tooltip placement='top' title={record.mcapStatus === 'completed' ? '一键跳转至Dreamer' : '视频解码未完成，Dreamer无法加载视频'}>
                        <Button size='small' type='primary' danger={record.mcapStatus !== 'completed' && true} onClick={() => { handleJumpDreamer(record) }} icon={<PlayCircleOutlined />} />
                    </Tooltip>
                    <Tooltip placement='top' title="下载文件">
                        <Button size='small' type='primary' onClick={() => { handleFileDown(record) }} icon={<CloudDownloadOutlined />} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <ConfigProvider theme={{ components: { Table: tableToken } }}>

            <Table onRow={(record) => {
                return {
                    onDoubleClick: (event) => { handleDbClick(record) },
                };
            }}
                columns={SliceTableSchema}
                pagination={paginationProps}
                scroll={{ y: '35vh' }}
                dataSource={list}
                size="small"
                rowKey='id' />
        </ConfigProvider>
    )
}

export default SliceTable