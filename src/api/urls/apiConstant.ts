import { CommentResponse, CommonResponse, SendSmsCodeResponse } from "@/api/types/polls"
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
    'newSong': '/163api/personalized/newsong',
    'songUrl': '/163api/song/url',
    'cloudsearch': '/163api/cloudsearch',
    'lyric': '/163api/lyric',
    'upload': '/nothing/file/upload',
    'imagesList': '/nothing/file/imagesList',
    'login-check': '/nothing/users/login-check',
    "subjects": "/polls01/subjects/",
    "teachers": "/polls01/teachers/",
    "good": "/polls01/praise/",
    "bad": "/polls01/criticize/",
    "login": '/polls01/login/',
    "sendSmsCode": '/polls01/send_mobile_code/'
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
export interface imagesList {
    imgName: string
}

export interface subject {
    no: number,
    name: string,
}
export interface teacher {
    no: number,
    name: string,
    sex: boolean,
    birth: string,
    intro: string,
    photo: string,
    good_count: number,
    bad_count: number
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
    },
    'login': CommonResponse,
    'upload': {
        data: string,
        errno: number,
        msg: string,
    },
    'imagesList': {
        data: Array<imagesList>,
        errno: number,
        msg: string,
    },
    'login-check': {
        errno: number,
        msg: string
    },
    "subjects": {
        count: number,
        next: null | number | string,
        previous: string,
        results: subject[],
    },
    "teachers": {
        subject: subject
        teachers: teacher[]
    },
    "good": CommentResponse,
    "bad": CommentResponse,
    "sendSmsCode": SendSmsCodeResponse
}

export default apiList;