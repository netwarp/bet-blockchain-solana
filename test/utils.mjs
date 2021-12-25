import assert from 'assert'
import {isNumber, getLatestNumberFromHash} from '../resources/js/utils.mjs'

describe('Tests on numbers', () => {

    it('should be a number', () => {
        assert.equal(isNumber('1'), true)
        assert.equal(isNumber('0'), true)
        assert.equal(isNumber('e'), false)
        assert.equal(isNumber('A'), false)
    })

    it('should return the latest number from the hash', () => {

        let hash = ''

        hash = 'wJ1xRBqJiaitinWk7Ws'
        assert.equal(getLatestNumberFromHash(hash), 7)

        hash = '94M3i1yzkoJcQsiuccjQTkNS'
        assert.equal(getLatestNumberFromHash(hash), 1)

        hash = 'Kv7jg6uFPV4B3p8TTgy34T'
        assert.equal(getLatestNumberFromHash(hash), 4)
    })
})


