/**
 *
 * @param {number} total
 * @param {number} percent
 * @return {number}
 */
export function percent(total, percent) {
    return Math.round(total * percent / 100)
}

/**
 *
 * @param {string} char
 * @return {Boolean}
 */
export function isNumber(char) {
    return char.length && isFinite(char)
}

/**
 *
 * @param {string} hash
 * @return {number|boolean}
 */
export function getLatestNumberFromHash(hash) {
    if ( ! hash.length) {
        return false
    }

    const length = hash.length

    let latest_number = null

    for (let i = length -1; i > 0; i--) {

        const current_char = hash.at(i)

        if (isNumber(current_char)) {
            latest_number = current_char
            break
        }
    }

    return parseInt(latest_number)
}

/**
 *
 * @param {string} signature
 * @param {string} slot
 * @param {string} slot_leader
 */
export function bet(signature, slot, slot_leader) {

    for (let i = 0; i < 10; i++) {

        const c = signature.includes(i.toString()) && slot.includes(i.toString()) && slot_leader.includes(i.toString())

        if (c) {
            return i
        }
    }

    return false
}