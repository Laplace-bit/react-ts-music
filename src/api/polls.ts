import service from "./common/service"

// 获取科目
export const getSubjects = async () => {
    return await service({
        url: "subjects"
    })
}

// 获取teacher
export const getTeachers = async (no: number) => {
    return await service({
        url: "teachers",
        data: { sno: no }
    })
}

// commit
export const commitComment = async (no: number, comment: string) => {
    const currUrl = comment === "good" ? "good" : "bad"
    return await service({
        url: currUrl,
        data: { tno: no },
        method: "GET"
    })
}

export const sendSmsCode = async (phone: string) => {
    return await service({
        url: "sendSmsCode",
        data: { phone },
        method: "POST"
    })
}

