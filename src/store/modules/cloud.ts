/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-08 13:26:03
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-08 13:35:22
 * @Description: 
 */
import { getOBSBucket } from '@/apis/pilot'
import {createSlice,Dispatch} from '@reduxjs/toolkit'

const cloudSlice = createSlice({
    name:'cloud',
    initialState:{
        OBSBucket:[]
    },
    reducers:{
        setOBSBucket(state,action){
            state.OBSBucket = action.payload
        }
    }
})

const {setOBSBucket} = cloudSlice.actions

const fetchObsBucket = ()=>{
    return async (dispatch:Dispatch)=>{
        const res = await getOBSBucket({})
        dispatch(setOBSBucket(res.data))
    }
}

const cloudReducers = cloudSlice.reducer
export {fetchObsBucket}
export default cloudReducers 