/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 14:33:47
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-11 17:46:18
 * @Description:
 */
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./modules/login";
import commonReducer from "./modules/common";
const store = configureStore({
  reducer: {
    login: loginReducer,
    common: commonReducer,
  },
});

export default store;
