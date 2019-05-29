export default function servFindExp(watchList, expiredList) {
    console.log(expiredList.ITEMS[0].imdbid)
    let result = watchList.map((wLMovie) => {
        console.log(wLMovie.dataValues.imbdid)
        for (let i = 0; i < expiredList.ITEMS.length; i++) {
            if (wLMovie.datValues.imdbid === expiredList.ITEMS[i].imdbid) {
                return {
                    title: wLMovie.dataValues.title,
                    imdbid: wLMovie.imdbid,
                    date: expiredList.ITEMS[i].unogsdate
                }
            }
        }
        // return {
        //     title: wLMovie.title,
        //     imdbid: wLMovie.imdbid,
        //     date: "-"
        // }
    })
    console.log(result)
    return result
}
