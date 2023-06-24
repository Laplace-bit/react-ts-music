import React, { useRef, useState } from 'react';
import { Button, Checkbox, Form, Input, type FormInstance } from 'antd';
import { login } from '@/api/userRequest';
import { useAppDispatch } from '@/store/hooks';
import { userChange } from '@/store/features/users-silce';
interface formInfo {
    username: string,
    password: string,
}


const Login: React.FC = () => {

    const dispatch = useAppDispatch();
    const formRef = React.useRef<FormInstance>(null);
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        // 校验通过password
        const { errno, msg } = await login(values.username, values.password);
        if (errno === 0) {
            dispatch(userChange({ loginFlag: true }))
        } else {
            console.error(msg)
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        formRef.current?.setFieldsValue({ username: 'Hi, man!' });
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
            <Form
                name="basic"
                ref={formRef}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ username: 'laoshi', password: '123' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default Login;

