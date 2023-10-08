const {sortPages} = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages small set', () => {
    const input = {
        'https://wagslane.dev/path' : 1,
        'https://wagslane.dev' : 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]

    expect(actual).toEqual(expected)
})

test('sortPages large set', () => {
    const input = {
        'https://wagslane.dev/path1' : 5,
        'https://wagslane.dev/path2' : 3,
        'https://wagslane.dev/path3' : 9,
        'https://wagslane.dev/path4' : 2,
        'https://wagslane.dev/path5' : 1,
        'https://wagslane.dev/path6' : 11
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path6', 11],
        ['https://wagslane.dev/path3', 9],
        ['https://wagslane.dev/path1', 5],
        ['https://wagslane.dev/path2', 3],
        ['https://wagslane.dev/path4', 2],
        ['https://wagslane.dev/path5', 1],
    ]

    expect(actual).toEqual(expected)
})