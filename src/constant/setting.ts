import { theme } from "antd";
import { MapToken } from "antd/es/theme/interface";
import { SeedToken } from "antd/es/theme/internal";

export interface themeItem {
    value: string
    label: string
    theme: typeof theme.defaultAlgorithm
}

export const themeList: Array<themeItem> = [
    { value: 'defaultAlgorithm', label: '默认模式', theme: theme.defaultAlgorithm },
    { value: 'darkAlgorithm', label: '黑暗模式', theme: theme.darkAlgorithm },
    { value: 'compactAlgorithm', label: '紧凑模式', theme: theme.compactAlgorithm },
]