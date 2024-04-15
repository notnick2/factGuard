import asyncio
from pyppeteer import launch

search = "varun+jakkula"

async def main():
    browser = await launch()
    page = await browser.newPage()
    await page.goto(f'https://www.google.com/search?q={search}')

    # Wait for the search results to load
    await page.waitForSelector('a')

    # Extract all links from the search results
    links = await page.evaluate('''() => {
        const links = Array.from(document.querySelectorAll('a'));
        return links.map(link => link.href);
    }''')

    # Print all the links
    for link in links:
        print(link)

    await browser.close()

asyncio.get_event_loop().run_until_complete(main())
