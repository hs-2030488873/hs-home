/**
 * 当字符串存在双码元字符时获取字符串字符个数
 * 需要浏览器支持ES6
 * @param string
 * @returns 字符串的字符个数
 */

export function stringPointLength(str: string) {
    let length = 0
    for (let i = 0; i < str.length; ) {
        //@ts-ignore
        i += str?.codePointAt(i) > 2 ** 16 - 1 ? 2 : 1
        length++
    }
    return length
}
