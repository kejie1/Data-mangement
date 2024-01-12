/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 17:46:56
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 15:19:26
 * @Description: 
 */
import { useEffect, useState } from 'react'
import SliceForm from './components/Slice/SliceForm'
import SliceTable from './components/Slice/SliceTable'
import EventForm from './components/Event/EventForm'
import EventTable from './components/Event/EventTable'
import SliceDetail from './components/Slice/SliceDetail'
import { getLabels, getSliceListAPI, getEventListAPI, getErrorTypeAPI, getDataCleanErrorCountAPI } from '@/apis'
import {
    EventResponseData,
    SliceResponseData
} from '@/types'
import EventDetail from './components/Event/EventDetail'
function Index() {
    const [sliceList, setSliceList] = useState<SliceResponseData>()
    const [eventList, setEventList] = useState<EventResponseData>()
    const [sliceParams, setSliceParams] = useState({})
    const [eventParams, setEventParams] = useState({})
    const [sliceOpen, setSliceOpen] = useState(false)
    const [sliceId, setSliceId] = useState('')
    const [eventOpen, setEventOpen] = useState(false)
    const [eventId, setEventId] = useState('')
    const [eventPage, setEventPage] = useState({ pageNum: 1, pageSize: 20 })
    const [slicePage, setSlicePage] = useState({ pageNum: 1, pageSize: 20 })
    const [errorQuality, setErrorQuality] = useState({})
    useEffect(() => {
        getSliceListAPI(sliceParams, slicePage).then(res => {
            setSliceList(res.data)
        })
        getDataCleanErrorCountAPI(sliceParams).then(res => {
            setErrorQuality(res.data)
        })
    }, [sliceParams, slicePage])
    useEffect(() => {
        getEventListAPI(eventParams, eventPage).then(res => {
            setEventList(res.data)
        })
    }, [eventParams, eventPage])
    return (
        <div>
            <SliceForm sliceParams={sliceParams} errorQuality={errorQuality} setSliceParams={setSliceParams} />
            <SliceTable slicePage={slicePage} setSlicePage={setSlicePage} response={sliceList} setSliceOpen={setSliceOpen} setSliceId={setSliceId} />
            <EventForm setEventParams={setEventParams} />
            <EventTable setSliceParams={setSliceParams} eventPage={eventPage} setEventPage={setEventPage} setEventOpen={setEventOpen} setEventId={setEventId} response={eventList} />
            <SliceDetail sliceOpen={sliceOpen} setSliceOpen={setSliceOpen} sliceId={sliceId}></SliceDetail>
            <EventDetail eventId={eventId} eventOpen={eventOpen} setEventOpen={setEventOpen} />
        </div>
    )
}

export default Index