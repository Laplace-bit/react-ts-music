import service from "./config"

/** 登录 */
export const login = async (userName: String, password: String) => {
    return await service({
        method: "post",
        url: "login",
        data: {
            userName,
            password,
        }
    })
}

