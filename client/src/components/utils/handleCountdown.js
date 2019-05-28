

export default function getDays(exp) {
    if (exp === "-") {
        return "Available"
    }
    let today = new Date()
    let one_day = 1000 * 60 * 60 * 24
    let goneDate = new Date(exp)
    return Math.ceil((goneDate - today.getTime()) / one_day)
}
