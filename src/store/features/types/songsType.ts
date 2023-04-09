// 列表
export interface SongListState {
    id: number,
    name: string,
    picUrl: string,
    desc: string,
    al?: {
        id: number
        picUrl: string
    }
    song?: {
        name: string,
        id: number,
        album: any,
        disc: string
    }
}

// 当前播放id
export interface SongState {
    id: number,
    name: string,
    singer?: string,
    lyric?: string
}


