/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 14:31:27
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-09 14:34:25
 * @Description: 
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './route'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider,theme } from 'antd'
import './index.scss'
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm,token:{colorPrimary: '#957ECF'},}}>
    <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  </React.StrictMode>
)