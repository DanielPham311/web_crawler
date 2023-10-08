function printReport(pages)
{
    console.log("==========================")
    console.log("Report")
    console.log("==========================")

    const sortedPages = sortPages(pages)

    for (const page of sortedPages)
    {
        const url = page[0]
        const hits = page[1]
        console.log(`Found ${hits} links to page:${url}`)
    }

    console.log("==========================")
    console.log("End of Report")
    console.log("==========================")
}

function sortPages(pages)
{
    pagesArray = Object.entries(pages)
    pagesArray.sort((a,b) => {
        aHits = a[1]
        bHits = b[1]
        return bHits - aHits
    })
    return pagesArray
}

module.exports = {
    sortPages,
    printReport
}