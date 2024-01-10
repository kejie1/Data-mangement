/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 14:36:14
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 11:18:52
 * @Description: 
 */
import { Outlet } from "react-router"
import React, { useState } from 'react';
import { Layout, theme, ConfigProvider } from 'antd';
import Menus from './Menus'

const { Header, Content } = Layout;

const Index = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (

        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        siderBg: '#fffff',
                        bodyBg: '#fffff',
                        footerBg: '#fffff',
                        headerBg: '#fffff',
                        lightTriggerBg: '#fffff',
                        lightSiderBg: '#fffff',
                        triggerBg: '#fffff',
                    },
                },
            }}
        >
            <Layout style={{ height: '100vh', background: '#ffffff', borderRadius: borderRadiusLG }}>
                <Menus />
                <Layout>
                    <Content
                        style={{
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>

    )
}
export default Index