import service from "./config"

// 获取新音乐
export const getNewSongs = async () => {
    return await service({
        url: "newSong"
    })
}

export const getSongUrl = async (id: number) => {

    return await service({
        url: "songUrl",
        data: {
            id: id.toString(),
        }
    })
}

// 搜索音乐
export const searchSong = async (keywords: string, limit: number = 30, offset: number = 0) => {
    return await service({
        url: "cloudsearch",
        data: {
            keywords,
            limit,
            offset,//分页
        }
    })
}

