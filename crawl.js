const {JSDOM} = require('jsdom')

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
    getURLsFromHTML
}