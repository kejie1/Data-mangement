/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-08 10:49:16
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 10:35:47
 * @Description: 
 */
import { lazy, Suspense } from "react";
import { RouteType } from './RouteType'
import { AuthRoute } from "@/components/AuthRoute";
const Index = lazy(() => import('@/pages/Layout'))
const Login = lazy(() => import('@/pages/Layout/Login'))
const Pilot = lazy(() => import('@/pages/Data/Pilot'))
const Parking = lazy(() => import('@/pages/Data/Parking'))
const RoadTest = lazy(() => import('@/pages/Data/RoadTest'))
const useRoutes: Array<RouteType> = [
    {
        title: "登录",
        key: "login",
        path: "/login",
        element: <Login />,
    },
    {
        title: "首页",
        key: "/",
        path: "/",
        element: <AuthRoute><Index /></AuthRoute>,
        children: [
            {
                index: true,
                path: '/getPilotData',
                key: 'getPilotData',
                element: <Suspense fallback={'加载中'}><Pilot /></Suspense>
            },
            {
                path: '/getParkingData',
                key: 'getPilotData',
                element: <Suspense fallback={'加载中'}><Parking /></Suspense>
            },
            {
                path: '/getRoadTestData',
                key: 'getPilotData',
                element: <Suspense fallback={'加载中'}><RoadTest /></Suspense>
            }
        ]
    },

]

export default useRoutes