export function date2string(date: any) {
    const YY = date.getFullYear()
    const MM = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

    return YY + '-' + MM + '-' + DD
}

export function timeFormat(time: string) {
    const timeAry = Array.prototype.slice.call(time)

    timeAry.splice(-2, 0, ':')
    timeAry.splice(-5, 0, ':')
    timeAry.splice(-8, 0, ' ')
    timeAry.splice(4, 0, '-')
    timeAry.splice(7, 0, '-')

    return timeAry.join('')
}