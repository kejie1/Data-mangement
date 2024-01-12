/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 15:31:50
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-11 17:45:32
 * @Description:
 */
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { getLabels } from "@/apis";

const loginSlice = createSlice({
  name: "common",
  initialState: {
    labelList: [],
  },
  reducers: {
    setUserInfo(state, action) {
      state.labelList = action.payload;
    },
  },
});

const { setUserInfo } = loginSlice.actions;

const fetchLabelList = () => {
  return async (dispatch: Dispatch) => {
    const res = await getLabels();
    dispatch(setUserInfo(res.data));
  };
};

const commonReducer = loginSlice.reducer;
export default commonReducer;
export { fetchLabelList };
