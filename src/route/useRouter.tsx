/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-08 10:49:16
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-08 13:16:55
 * @Description: 
 */
/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-08 10:49:16
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-08 10:52:46
 * @Description: 
 */
import { lazy } from "react";
import {RouteType} from './RouteType'

const Layout = lazy(() => import('@/pages/Layout/Layout'))


const useRoutes:Array<RouteType> = [
        {
            title:"首页",
            key:"/",
            path:"/",
            element:<Layout />,
        }   
]

export default useRoutes