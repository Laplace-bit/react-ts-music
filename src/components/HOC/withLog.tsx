import { useEffect, FC, ComponentType } from "react";

// 定义高阶组件的 Props 类型
interface HOCProps {
    // 在这里添加共享的状态或逻辑的类型
}

// 高阶组件的名称通常以 "with" 开头
const withLog = <P extends object>(WrappedComponent: ComponentType<P>) => {
    // 返回一个新的函数组件
    const HOC: FC<P & HOCProps> = (props) => {
        // 在这里添加一些共享的状态或逻辑
        useEffect(() => {
            console.log(`WrappedComponent: ${WrappedComponent.name} iscreated!`)
        })

        // 渲染被包装的组件
        return <WrappedComponent {...props} />;
    };

    return HOC;
};

export default withLog;