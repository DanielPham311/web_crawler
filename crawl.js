const {JSDOM} = require('jsdom')

async function crawlPage(baseURL, curPageURL, pages)
{
    const baseURLObj = new URL(baseURL)
    const curURLObj = new URL(curPageURL)

    if (baseURLObj.hostname !== curURLObj.hostname)
    {
        return pages
    }

    const normalizedCurURL = normalizeURL(curPageURL)
    if (pages[normalizedCurURL] > 0)
    {
        pages[normalizedCurURL]++
        return pages
    }

    pages[normalizedCurURL] = 1

    console.log(`Currently crawling ${curPageURL}`)
    
    try
    {
        const response = await fetch(curPageURL)
        if (response.status > 399)
        {
            console.log(`error encountered in fetch with status code ${response.status} on URL: ${curPageURL}`)
            return pages
        }

        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html'))
        {
            console.log(`non html response, ${contentType} was received instead on URL: ${curPageURL}`)
            return pages
        }

        const htmlBody = await response.text()
        const nextURLS = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLS)
        {
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    }
    catch(err)
    {
        console.log(`error encountered in fetch: ${err.message} on URL: ${curPageURL}`)
    }
    return pages
}

function getURLsFromHTML(htmlBody, baseURL)
{
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (element of linkElements)
    {
        if (element.href.charAt(0) === '/')
        {
            try
            {
                const urlObject = new URL(`${baseURL}${element.href}`)
                if (urls.includes(urlObject.href))
                    continue
                else urls.push(urlObject.href)
            }
            catch(err)
            {
                console.log(`error found: ${err.message}`)
            }

        }
        else 
        {
            try
            {
                const urlObject = new URL(element.href)
                if (urls.includes(urlObject.href)) continue
                else urls.push(urlObject.href)
            }
            catch(err)
            {
                console.log(`error found: ${err.message}`)
            }
        }
    }
    
    return urls
}

function normalizeURL(urlString)
{
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    if (hostPath.endsWith('/'))
    {
        return hostPath.slice(0, -1)
    }

    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}