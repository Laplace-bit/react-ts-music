
/**
 * @description: 所有的接口列表
 * @param {*} 无参数
 * @return {*} 无返回值
 * ```js
 * key表示url路径缩写
 * value表示真实请求的路径
 * ```
 */
const apiList = {
    'newSong': '/personalized/newsong',
    'songUrl': '/song/url',
    'cloudsearch': '/cloudsearch',
    'lyric': '/lyric'
}
/**
 * @description: 所有的接口列表类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export type apiKeyType = keyof typeof apiList;


interface songDetail {
    id: number
    url: string
}
/**
 * @description: 接口对应的数据返回值类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export interface apiKeyDataType {
    'newSong': {
        category: number,
        code: number,
        result: any,
    },
    'songUrl': {
        category: number,
        code: number,
        data: songDetail[]
    },
    'cloudsearch': {
        code: number,
        result: {
            songCount: number,
            songs: any,
        }
    },
    'lyric': {
        code: number,
        lrc: {
            lyric: string,
        }
    }
}

export default apiList;