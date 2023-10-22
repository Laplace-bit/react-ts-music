import service from "./common/service"

/** 登录 */
export const login = async (username: String, password: String) => {
    return await service({
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
    return await service({
        method: "get",
        url: "login-check",
    })
}

