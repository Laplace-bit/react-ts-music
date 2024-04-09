import React, { useCallback, useEffect } from 'react';
import { Button, Checkbox, Form, Input, type FormInstance } from 'antd';
import { login } from '@/api/userRequest';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userChange } from '@/store/features/users-silce';
import useRequestSync from '@/hooks/useRequestSync';
import CommonFunc from '@/tools/commonFunc';
import SmsCode from '@/components/funComponents/SmsCode';
import { redirect, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {

    const loginFlag = useAppSelector((state) => state.user.loginFlag);
    const navigate = useNavigate();
    useEffect(() => {
        if (loginFlag) {
            navigate('/');
            console.log('重定向')
        }
    }, [loginFlag, navigate])
    const dispatch = useAppDispatch();
    const { sendHttp } = useRequestSync()
    const formRef = React.useRef<FormInstance>(null);
    const [form] = Form.useForm();
    const onFinish = useCallback(async (values: any) => {
        try {
            // 校验通过password
            const { header, body } = await sendHttp(login(values.username, values.password));
            if (header.code === "0000") {
                dispatch(userChange({ loginFlag: true }))
                CommonFunc.toggleMsg("success", body.msg)
                redirect('/home')
            } else {
                dispatch(userChange({ loginFlag: false }))
                CommonFunc.toggleMsg("error", body.msg)
            }
        } catch (error) {
            console.error(error)
        }
    }, [dispatch, sendHttp]);

    const onFinishFailed = (errorInfo: any) => {
        formRef.current?.setFieldsValue({ username: 'Hi, man!' });
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center', backgroundColor: 'black' }}>
            <Form
                form={form}
                name="basic"
                ref={formRef}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ username: 'admin', password: '123' }}
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
                <Form.Item
                    label="phoneNumber"
                    name='phoneNumber'
                    rules={[
                        {
                            pattern: /^1[0-9]{10}$/,
                            validator: (rule, value) => {
                                return rule.pattern?.test(value) ? Promise.resolve() : value ? Promise.reject('手机号码格式有误') : Promise.resolve()
                            },
                        }
                    ]}
                >
                    <SmsCode></SmsCode>
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

