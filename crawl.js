const {JSDOM} = require('jsdom')

async function crawlPage(curPageURL)
{
    console.log(`Currently crawling ${curPageURL}`)

    try
    {
        const response = await fetch(curPageURL)
        if (response.status > 399)
        {
            console.log(`error encountered in fetch with status code ${response.status} on URL: ${curPageURL}`)
            return
        }

        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html'))
        {
            console.log(`non html response, ${contentType} was received instead on URL: ${curPageURL}`)
            return
        }

        console.log(await response.text())
    }
    catch(err)
    {
        console.log(`error encountered in fetch: ${err.message} on URL: ${curPageURL}`)
    }
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