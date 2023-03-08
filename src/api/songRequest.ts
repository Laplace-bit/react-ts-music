import service  from "./config"

// 获取新音乐
export const getNewSongs = async () => {
    return await service({
        url: "newSong"
    })
}
