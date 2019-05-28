export default function findExpired(watchList, expiredList) {
    let result = watchList.map((wLMovie) => {
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
            imdbid: wLMovie.imdbid,
            date: "-"
        }
    })
    return result
}
