// 列表
export interface SongListState {
    alg: string;
    canDislike: boolean;
    copywriter: any;
    id: number;
    name: string;
    picUrl: string;
    song: {
        subType: string;
        name: string;
        id: number;
        position: number;
        alias: Array<any>;
        status: number;
        album: any;
        audition: null
        bMusic: any;
        commentThreadId: string
        copyFrom: string
        copyright: number
        copyrightId: number
        crbt: null
        dayPlays: number
        disc: string
        duration: number
        exclusive: false
        fee: number
        ftype: number
        hrMusic: null
        mark: number
        mp3Url: null
        mvid: number

    }
    trackNumberUpdateTime: null;
    type: number;
}

// 当前播放id
export interface SongState {
    id: number,
}


