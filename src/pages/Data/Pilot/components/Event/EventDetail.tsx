/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-11 17:53:21
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 16:04:19
 * @Description: 
 */


import React, { useEffect, useState } from 'react'
import { Drawer, Tag, Button, Table, Col, Row, ConfigProvider } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import type { EventResponse, Label } from '@/types'
import { copyText } from '@/utils';
import { getEventDetailAPI } from '@/apis'
import { tableToken } from '../common';
import './eventDetail.scss'
interface EventDetailType {
    eventId: string,
    eventOpen: boolean
    setEventOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const EventDetail: React.FC<EventDetailType> = ({ eventOpen, setEventOpen, eventId }) => {
    const [event, setEvent] = useState([])
    const [detail, setDetail] = useState<EventResponse>()
    useEffect(() => {
        eventId && getEventDetailAPI({ eventId }).then(res => {
            const { id, vehicleCode, adcm, version, location, obsKey, eventTime, dateCreated, } = res.data as EventResponse
            setEvent([
                { label: 'Event Id', value: id, icon: <CopyOutlined color="purple" onClick={() => { copyText(id) }} /> },
                { label: '车架号', value: vehicleCode, icon: <CopyOutlined color="purple" onClick={() => { copyText(vehicleCode) }} /> },
                { label: 'ADCM版本号', value: adcm, icon: null },
                { label: '版本号', value: version, icon: null, tag: <Tag color="purple">{version}</Tag> },
                { label: '采集地', value: location, icon: null },
                { label: '路径', value: obsKey, icon: <CopyOutlined color="purple" onClick={() => { copyText(obsKey) }} /> },
                { label: '事件时间', value: eventTime, },
                { label: '入库时间', value: dateCreated, icon: null },
            ])
            setDetail(res.data)
        })
    }, [eventId])
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

    return (
        <Drawer
            placement='top'
            width='100%'
            open={eventOpen}
            closeIcon={false}
            onClose={() => { setEventOpen(false) }}
        >
            <Row>
                <Col span={12}>
                    <ul className='detail'>
                        <span>事件详情</span>
                        {event.map((item, index) => (
                            <li key={index} className='flex items-center pd-s'>
                                <strong>{item.label}:</strong>
                                <div>
                                    {item.tag && item.tag}
                                    {!item.tag && <span> {item.value}</span>}
                                    {item.icon && <Button type='primary' icon={item.icon} size='small' />}
                                </div>
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col span={12}>
                    <ConfigProvider theme={{ components: { Table: tableToken } }}>
                        <Table title={() => 'Here is title'} dataSource={detail?.label} columns={TagSchema} rowKey='category' size='small' />
                    </ConfigProvider>
                </Col>
            </Row>
        </Drawer >
    )
}

export default EventDetail