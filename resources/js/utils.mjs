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

// utils front


