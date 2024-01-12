/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-10 17:54:12
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 17:10:43
 * @Description: 切片详情
 */


import React, { useEffect, useState } from 'react'
import { Drawer, Tag, Button, Table, Col, Row, Tabs, TabsProps, message, ConfigProvider, Switch } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { getSliceDetailAPI } from '@/apis'
import { CopyOutlined } from '@ant-design/icons'
import type { SliceDetailResponse, FilesInfo, Label, ErrorsDetail, Events } from '@/types'
import { copyText } from '@/utils';
import dayjs from 'dayjs';
import { tableToken } from '../common';
import '@/assets/style/global.scss'
import './sliceDetail.scss'
function SliceDetail({ sliceOpen, sliceId, setSliceOpen }) {
    const [sliceDetail, setSliceDetail] = useState<SliceDetailResponse>()
    const [slice, setSlice] = useState([])
    const [sliceInfoList, setSliceInfoList] = useState<Array<FilesInfo>>([])
    const onClose = () => {
        setSliceOpen(false)
    }
    useEffect(() => {
        sliceId && getSliceDetailAPI(sliceId).then(res => {
            if (!res.data) return message.error('无法加载详情数据')
            setSliceDetail((prevSliceDetail) => {
                const newSliceDetail = { ...prevSliceDetail, ...res.data };
                return newSliceDetail;
            })
            const { id, vehicleCode, adcm, version, location, person, path, dateCreated, startDate } = res.data as SliceDetailResponse
            setSlice([
                { label: 'Slice Id', value: id, icon: <CopyOutlined color="purple" onClick={() => { copyText(id) }} /> },
                { label: '车架号', value: vehicleCode, icon: <CopyOutlined color="purple" onClick={() => { copyText(vehicleCode) }} /> },
                { label: 'ADCM版本号', value: adcm, icon: null },
                { label: '版本号', value: version, icon: null, tag: <Tag color="purple">{version}</Tag> },
                { label: '采集地', value: location, icon: null },
                { label: '采集人', value: person, icon: null },
                { label: '路径', value: path, icon: <CopyOutlined color="purple" onClick={() => { copyText(path) }} /> },
                { label: '录制时间', value: startDate, },
                { label: '入库时间', value: dateCreated, icon: null },
            ])
        })
    }, [sliceId])
    // 切片表格选择按钮
    const onChangeCheckBox = (selectedRowKeys: React.Key[], selectedRows: FilesInfo[]) => {
        setSliceInfoList(selectedRows)
    }
    const copySliceLink = () => {
        if (sliceInfoList.length === 0) return message.warning('未选择数据')
        copyText(sliceInfoList.map(item => item.download_url))
    }
    const handleSliceDown = () => {
        if (sliceInfoList.length === 0) return message.warning('未选择数据')
        // 选择全部：打包下载，否则单文件下载
        if (sliceInfoList.length === sliceDetail.filesInfo.length) {
            window.open(`${import.meta.env.VITE_APP_BASE_API}v1/ori/getIdSegmentZip/${sliceDetail.id}/${localStorage.getItem('id')}`, "_blank")
        } else {
            sliceInfoList.forEach((item, index) => {
                setTimeout(() => {
                    window.open(item.download_url, '_blank')
                }, 250 * index)
            })
        }
    }
    // 表格schema
    const EventSchema: ColumnsType<Events> = [
        {
            title: '事件描述',
            dataIndex: 'event_description',
            key: 'event_description',
        },
        {
            title: '时间信息',
            dataIndex: 'event_time',
            key: 'event_time',
            render: ({ event_time }) => (
                <>{dayjs(event_time).format('YYYY-MM-DD HH:mm:ss')}</>
            )
        },
    ]
    const SliceSchema: ColumnsType<FilesInfo> = [
        {
            title: '文件名',
            dataIndex: 'file_name',
            key: 'file_name',
        },
        {
            title: '',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a></a>,
        },
    ]
    const TagSchema: ColumnsType<Label> = [
        {
            title: '标签',
            dataIndex: 'name',
            key: 'name',
            render: (_, { name }) => (
                <Tag color='purple'>{name}</Tag>
            )
        },
        {
            title: '标签开始时间',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: '总里程',
            dataIndex: 'start_mileage',
            key: 'start_mileage',
        },
    ]
    const ErrorSchema: ColumnsType<ErrorsDetail> = [
        {
            title: '事件描述',
            dataIndex: 'event_description',
            key: 'event_description',
        },
        {
            title: '时间信息',
            dataIndex: 'event_time',
            key: 'event_time',
            render: ({ event_time }) => (
                <>{dayjs(event_time).format('YYYY-MM-DD HH:mm:ss')}</>
            )
        },
    ]
    // tabs页
    const tabs: TabsProps['items'] = [
        {
            key: 'event',
            label: '事件列表',
            children: <Table dataSource={sliceDetail?.events} columns={EventSchema} rowKey='event_time' size='small' />,
        },
        {
            key: 'slice',
            label: '切片文件',
            children: <Table rowSelection={{
                type: 'checkbox',
                onChange: onChangeCheckBox
            }}
                dataSource={sliceDetail?.filesInfo}
                columns={SliceSchema}
                rowKey='file_name'
                size='small'
                summary={() => (
                    <Table.Summary fixed='top'>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={1} colSpan={3}>
                                <Tag color='purple' className='cursor-p' onClick={copySliceLink}>copy link</Tag>
                                <Tag color='purple' className='cursor-p' onClick={handleSliceDown}>download</Tag>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />,
        },
        {
            key: 'tag',
            label: '标签信息',
            children: <Table dataSource={sliceDetail?.labels} columns={TagSchema} rowKey='category' size='small' />,
        },
        {
            key: 'error',
            label: '清洗错误详情',
            children: <Table dataSource={sliceDetail?.errorsDetail} columns={ErrorSchema} rowKey='errorName' size='small' />,
        },
    ]
    const onChange = (value: string) => {

    }
    return (
        <Drawer
            placement='top'
            width='100%'
            open={sliceOpen}
            closeIcon={false}
            onClose={onClose}
            height='65vh'
        >
            <Row>
                <Col span={12}>
                    <ul className='detail'>
                        <div className='fw-6 fs-18'>切片详情</div>
                        {slice?.map((item, index) => (
                            <li key={index} className='flex items-center pd-s'>
                                <strong>{item.label}:</strong>
                                <div>
                                    {item.tag && item.tag}
                                    {!item.tag && <span> {item.value}</span>}
                                    {item.icon && <Button size='small' type='primary' icon={item.icon} />}
                                </div>
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col span={12}>
                    <ConfigProvider theme={{ components: { Table: tableToken } }}>
                        <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />
                    </ConfigProvider>
                </Col>
            </Row>
        </Drawer >
    )
}

export default SliceDetail