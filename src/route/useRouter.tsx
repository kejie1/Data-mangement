/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-08 10:49:16
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-09 17:47:57
 * @Description: 
 */
import { lazy, Suspense } from "react";
import { RouteType } from './RouteType'
import { AuthRoute } from "@/components/AuthRoute";
const Index = lazy(() => import('@/pages/Layout'))
const Login = lazy(() => import('@/pages/Layout/Login'))
const Pilot = lazy(() => import('@/pages/Data/Pilot'))
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
                element: <Suspense fallback={'加载中'}><Pilot /></Suspense>
            }
        ]
    },

]

export default useRoutes