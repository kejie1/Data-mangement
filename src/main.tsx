/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 14:31:27
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-11 11:34:56
 * @Description: 
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './route'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { Provider } from 'react-redux'
import store from '@/store'
import './index.scss'
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)
const antdToken = {
  colorPrimary: '#6342BF',
  headerBg: '#fffff',
}
root.render(
  <React.StrictMode>
    {/* algorithm: theme.darkAlgorithm, */}
    <Provider store={store}>
      <ConfigProvider theme={{ token: antdToken, }}>
        <RouterProvider router={router}></RouterProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)