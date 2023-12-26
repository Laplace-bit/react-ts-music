import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { sendSmsCode } from '@/api/polls';
import useRequestSync from '@/hooks/useRequestSync';
// 定义一个正则表达式，用于校验手机号码格式
const phoneRegex = /^1[3-9]\d{9}$/;

// 定义一个函数，用于验证短信验证码
const verifyCode = (phone: string, code: string) => {
    // 模拟验证短信验证码的过程，你可以根据你的实际接口进行调用
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 假设验证成功，返回一个布尔值
            const result = code === '123456'; // 这里只是一个示例，你可以根据你的实际逻辑进行判断
            resolve(result);
        }, 1000);
    });
};

// 定义一个组件，包含一个输入框和一个发送按钮
const SmsCode = () => {
    // 定义一个状态，用于存储输入的手机号码
    const [phone, setPhone] = useState('');
    // 定义一个状态，用于存储输入的验证码
    const [code, setCode] = useState('');
    // 定义一个状态，用于存储倒计时的秒数
    const [countdown, setCountdown] = useState(0);
    // 定义一个状态，用于存储发送按钮的禁用状态
    const [disabled, setDisabled] = useState(false);

    // 定义一个副作用，用于实现倒计时的逻辑
    useEffect(() => {
        // 如果倒计时大于0，每隔一秒减一
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            // 清除定时器，避免内存泄漏
            return () => {
                clearTimeout(timer);
            };
        } else {
            // 如果倒计时等于0，恢复发送按钮的可用状态
            setDisabled(false);
        }
    }, [countdown]);

    // 定义一个函数，用于处理手机号码输入框的变化
    const handlePhoneChange = (e: { target: { value: any; }; }) => {
        // 获取输入框的值，并更新状态
        const value = e.target.value;
        setPhone(value);
    };

    // 定义一个函数，用于处理验证码输入框的变化
    const handleCodeChange = (e: { target: { value: any; }; }) => {
        // 获取输入框的值，并更新状态
        const value = e.target.value;
        setCode(value);
    };

    // 定义一个函数，用于处理发送按钮的点击
    const handleClick = async () => {
        // 检查手机号码格式是否正确，如果不正确，弹出提示信息
        if (!phoneRegex.test(phone)) {
            message.error('请输入正确的手机号码');
            return;
        }
        // 禁用发送按钮，避免重复点击
        setDisabled(true);
        // 调用发送短信验证码的函数，获取返回的验证码
        const code = await sendCode(phone);
        // 弹出提示信息，显示验证码
        message.success(`验证码已发送，为${code}`);
        // 设置倒计时为60秒
        setCountdown(60);
        // 调用验证短信验证码的函数，传入输入的验证码，获取返回的结果
        const result = await verifyCode(phone, code);
        // 如果结果为true，表示验证成功，否则表示验证失败，弹出提示信息
        if (result) {
            message.success('验证码验证成功');
        } else {
            message.error('验证码验证失败');
        }
    };
    const { sendHttp } = useRequestSync()
    // 定义一个函数，用于发送短信验证码
    const sendCode = async (phone: string) => {
        // 模拟发送短信验证码的过程，你可以根据你的实际接口进行调用
        const { header, body } = await sendHttp(sendSmsCode(phone))
        if (header && header.code === "0000") {
            return body.code
        }
        return ""
    };


    // 返回组件的渲染结果
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "1.6rem" }}>
                <Input
                    placeholder="请输入手机号码"
                    value={phone}
                    onChange={handlePhoneChange}
                    style={{ width: 200 }}
                />
                <Button
                    type="primary"
                    onClick={handleClick}
                    disabled={disabled}
                    style={{ marginLeft: 10 }}
                >
                    {disabled ? `${countdown}秒后重发` : '发送验证码'}
                </Button>
            </div>
            <Input
                placeholder="请输入验证码"
                value={code}
                onChange={handleCodeChange}
                style={{ width: 150, }}
            />

        </div>
    );
};

export default SmsCode;
