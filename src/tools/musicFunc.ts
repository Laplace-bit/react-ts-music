import CommonFunc from "./commonFunc";
import { type SongListState } from "@/store/features/types/songsType";
class MusicFunc extends CommonFunc {
    /**
     * 通过统一处理音乐列表数据格式
     * @param arr 处理音乐列表数组
     * @param type {newSong,searchSong} 类型
     * @returns 处理后的对象数组
     */
    static listHandler(arr: any[], type: string): SongListState[] {
        const resArr: SongListState[] = [];
        switch (type) {
            case 'newSong':
                arr.forEach(item => {
                    const songItem: SongListState = {
                        id: item.id,
                        picUrl: item.picUrl,
                        name: item.name,
                        desc: item.song?.album.subType
                    }
                    resArr.push(songItem)
                })
                break;
            case 'searchSong':
                arr.forEach(item => {
                    const songItem: SongListState = {
                        id: item.id,
                        picUrl: item.al?.picUrl,
                        name: item.name,
                        desc: item.al?.name,
                    }
                    resArr.push(songItem)
                })
                break
            default:
                break;
        }
        return resArr;
    }
}

export default MusicFunc;