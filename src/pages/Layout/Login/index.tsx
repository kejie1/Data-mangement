/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 15:04:02
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 10:52:56
 * @Description: 
 */
import { Button, Form, Input } from 'antd';
import { fetchUserInfo } from '@/store/modules/login';
import { useDispatch } from 'react-redux'
import { UnknownAction } from '@reduxjs/toolkit'
import './index.scss'
import { useNavigate } from 'react-router-dom';
import { fetchLabelList } from '@/store/modules/common';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values: any) => {
        try {
            await dispatch(fetchUserInfo({
                code: "ST-462476-htvFsTHHC3V0F91iSC2V"
            }) as unknown as UnknownAction)
            await dispatch(fetchLabelList as unknown as UnknownAction)
            navigate('/')
        } catch (e) {
            console.log("🚀 ~ onFinish ~ e:", e)
        }
    };
    type FieldType = {
        username?: string;
        password?: string;
    };
    return (
        <div className="login-container">
            <img src="/images/bg.png" alt="" />
            <div className='login-box' style={{ minWidth: 400 }}>
                <div className='title'>用户登录</div>
                <Form
                    name="basic"
                    style={{ minWidth: 300 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label=""
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input size='large' placeholder="Please input your username" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label=""
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password size='large' placeholder="Please input your password" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="default" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login