import service from "./common/service"

/** 文件上传 */
export const upload = async (file: any) => {
    return await service({
        method: "post",
        url: "upload",
        data: file,
    })
}
/** 获取图片名称列表 */
export const getImagesList = async () => {
    return await service({
        method: "get",
        url: "imagesList",
    })
}

