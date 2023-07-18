import { useEffect, useState, memo } from "react";
import "./lyric.less";
import moment from "moment"
interface lyricInfo {
    value: string,
    time: string,
}
interface Lyric {
    currentTime: number,
    lyricList: lyricInfo[],
    lyricChange: boolean,
}
const LyricBox: React.FC<Lyric> = ({ lyricList, currentTime, lyricChange }) => {
    // const fixdLyric = useRef<HTMLDivElement>(null);
    /*
        方案1：
        控制总行数(15行)为固定，每次刷新文本，不改变dom
    */
    interface mapObj {
        text: string,
        index: number,
    }
    useEffect(() => {
        if (lyricChange) {
            setShowList([]);
        }
    }, [lyricChange])
    // 以时间为key的map集合
    const [timeMap] = useState<Map<number, mapObj>>(new Map())
    useEffect(() => {
        lyricList.forEach((item, index) => {
            timeMap.set(moment.duration("00:" + item.time.slice(0, 5)).asSeconds(), { text: item.value, index })
        })
    }, [lyricList])

    const getCurrentIndex = (time: number): number => {
        let idx: number = 0;
        const curr = timeMap.get(Number(time.toFixed(0)))
        if (curr) {
            idx = curr.index;
        }
        return idx;
    }
    const [showList, setShowList] = useState<lyricInfo[]>([]);
    useEffect(() => {
        // updateList(currentTime)
        let index = getCurrentIndex(currentTime);
        if (index === 0) return;
        if (index + 7 > lyricList.length) return;
        if (index > 7 && showList.length > 1) {
            setShowList(lyricList.slice(index - 7, index + 7))
        } else {
            const appendChild: lyricInfo[] = new Array(7 - index);
            setShowList(appendChild.concat(lyricList.slice(index, index + 7)))
        }
    }, [currentTime])
    // const
    return (
        <div className="fixd-lyric">
            <div className="scrolly-lyric">
                {showList.map(item => {
                    return (
                        <p className="line" key={item.time.valueOf()}>{item.value}</p>
                    )
                })}
            </div>
        </div>
    );
};

export default memo(LyricBox);