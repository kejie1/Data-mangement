/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 17:46:56
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 17:58:19
 * @Description: 
 */
import { useEffect, useState } from 'react'
import SliceForm from './components/Slice/SliceForm'
import SliceTable from './components/Slice/SliceTable'
import EventForm from './components/Event/EventForm'
import EventTable from './components/Event/EventTable'
import { slice, event } from './components/data'
function Index() {
    const [sliceList, setSliceList] = useState([])
    const [eventList, setEventList] = useState([])
    const [sliceParams, setSliceParams] = useState({})
    const [eventParams, setEventParams] = useState({})
    useEffect(() => {
        // getSliceListAPI(sliceParams).then(res => {
        //     setSliceList(res.results)
        // })
        setSliceList(slice.results)
    }, [sliceParams])
    useEffect(() => {
        // getEventListAPI(sliceParams).then(res => {
        //     setEventList(res.results)
        // })
        setEventList(event.results)
    }, [eventParams])
    const changePage = (type: string, page: number) => {
        if (type === 'event') {
            // eventParams.pageNum = page
            // setEventParams({ ...eventParams })
        } else {
            // sliceParams.pageNum = page
            // setSliceParams({ ...sliceParams })
        }
        console.log("🚀 ~ changePage ~ sliceParams:", sliceParams)

    }
    return (
        <div>
            <SliceForm onGetSliceParams={(params) => { setSliceParams(params) }} />
            <SliceTable list={sliceList} onGetPagination={(type, page) => changePage(type, page)} />
            <EventForm onGetEventParams={(params) => { setEventParams(params) }} />
            <EventTable list={eventList} onGetPagination={(type, page) => changePage(type, page)} />
        </div>
    )
}

export default Index