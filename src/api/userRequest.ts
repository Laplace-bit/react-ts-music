import { Request } from "./common/requestBase"

/** 登录 */
export const login = async (username: String, password: String) => {
    const request = new Request()
    return await request.request({
        method: "post",
        url: "login",
        data: {
            username,
            password,
        }
    })
}
/** 登录检查 */
export const loginCheck = async () => {
    const request = new Request()
    return await request.request({
        method: "post",
        url: "loginCheck",
    })
}

