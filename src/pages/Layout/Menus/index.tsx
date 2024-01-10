/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 15:22:39
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 10:36:32
 * @Description: 
 */
/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 15:22:39
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 10:16:41
 * @Description: 
 */
import { Menu, Layout, Button, theme, MenuProps } from 'antd'
import { LogoSvg } from '@/icons/Icon';
import { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    SearchOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '@/assets/style/global.scss'
import { useNavigate } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];

// 创建菜单列表
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
function Menus() {
    const { Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const items: MenuItem[] = [
        getItem('原始数据', 'rawData', <SearchOutlined />, [getItem('高速数据查询', 'getPilotData'), getItem('泊车数据查询', 'getParkingData'), getItem('路试问题和轨迹', 'getRoadTestData')]),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
    ];
    const navigate = useNavigate()
    const handleMenuClick = (value) => {
        console.log("🚀 ~ handleMenuClick ~ value:", value)
        navigate(value.key)
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} width={'10%'}>
            <div className='flex justify-center items-center'>
                <Button
                    type="text"
                    icon={<LogoSvg />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        width: '50px', height: '50px'
                    }}
                />
                {!collapsed && <span style={{ fontWeight: 600, fontSize: '16px' }}>Data Management</span>}
            </div>
            < Menu
                onClick={handleMenuClick}
                mode="vertical"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>
    )

}

export default Menus

