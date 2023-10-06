const {normalizeURL} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/examplepath'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/examplepath'

    expect(actual).toEqual(expected)
})

test('normalizeURL redundant slash check', () => {
    const input = 'https://blog.boot.dev/examplepath/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/examplepath'

    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/examplepath'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/examplepath'

    expect(actual).toEqual(expected)
})

test('normalizeURL HTTP', () => {
    const input = 'http://blog.boot.dev/examplepath'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/examplepath'

    expect(actual).toEqual(expected)
})

test('normalizeURL full capitals', () => {
    const input = 'HTTP://BLOG.BOOT.DEV/examplepath'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/examplepath'

    expect(actual).toEqual(expected)
})