/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 14:33:47
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-09 15:43:03
 * @Description:
 */
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./modules/login";
const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
