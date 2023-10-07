const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
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

test('getURLsfromHTML absolute', () => {
    const htmlInput = `
    <html>
        <body>
            <a href="https://blog.boot.dev/examplepath">Boot.dev blog</a>
        </body>
    </html>
    `

    const baseURLInput = 'https://blog.boot.dev/examplepath'
    const actual = getURLsFromHTML(htmlInput, baseURLInput)
    const expected = ['https://blog.boot.dev/examplepath']

    expect(actual).toEqual(expected)
})

test('getURLsfromHTML relative', () => {
    const htmlInput = `
    <html>
        <body>
            <a href="/examplepath/">Boot.dev blog</a>
        </body>
    </html>
    `

    const baseURLInput = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlInput, baseURLInput)
    const expected = ['https://blog.boot.dev/examplepath/']

    expect(actual).toEqual(expected)
})

test('getURLsfromHTML multilink', () => {
    const htmlInput = `
    <html>
        <body>
            <a href="/examplepath/">Boot.dev blog</a>
            <p>This is some pure text</p>
            <a href="https://bootup.com/somepath">Another link</a>
            <a href="/anotherpath/dev/">More link</a>
        </body>
    </html>
    `

    const baseURLInput = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlInput, baseURLInput)
    const expected = ['https://blog.boot.dev/examplepath/', 'https://bootup.com/somepath', 'https://blog.boot.dev/anotherpath/dev/']

    expect(actual).toEqual(expected)
})

test('getURLsfromHTML duplicate links', () => {
    const htmlInput = `
    <html>
        <body>
            <a href="/examplepath/">Boot.dev blog</a>
            <p>This is some pure text</p>
            <a href="/examplepath/">Another link</a>
            <a href="/anotherpath/dev/">More link</a>
            <a href="https://bootup.com/somepath">More link</a>
            <a href="/anotherpath/dev/">More link</a>
        </body>
    </html>
    `

    const baseURLInput = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlInput, baseURLInput)
    const expected = ['https://blog.boot.dev/examplepath/', 'https://blog.boot.dev/anotherpath/dev/', 'https://bootup.com/somepath']

    expect(actual).toEqual(expected)
})

test('getURLsfromHTML invalid href', () => {
    const htmlInput = `
    <html>
        <body>
            <a href="uuaa">Invalid URL</a>
        </body>
    </html>
    `

    const baseURLInput = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlInput, baseURLInput)
    const expected = []

    expect(actual).toEqual(expected)
})