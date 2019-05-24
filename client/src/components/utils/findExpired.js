import { UserWatchList } from "../UserWatchList";

export default function findExpired(watchList, expiredList) {
    console.log(watchList)
    console.log(expiredList.ITEMS[0].imdbid)
    let result = watchList.map((wLMovie) => {
        console.log(wLMovie.imdbid)
        for (let i = 0; i < expiredList.ITEMS.length; i++) {
            if (wLMovie.imdbid === expiredList.ITEMS[i].imdbid) {
                return {
                    title: wLMovie.title,
                    imdbid: wLMovie.imdbid,
                    date: expiredList.ITEMS[i].unogsdate
                }
            }
        }
        return {
            title: wLMovie.title,
            imdbid: wLMovie.id,
            date: "-"
        }
    })
    return result
}