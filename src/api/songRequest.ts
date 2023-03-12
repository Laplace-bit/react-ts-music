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
