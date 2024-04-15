import asyncio
from pyppeteer import launch

async def main():
    browser = await launch()
    page = await browser.newPage()
    await page.goto('https://en.wikipedia.org/wiki/Cat')
    text_content = await page.evaluate('''() => {
        return document.body.innerText;
    }''')
    with open('scrape.txt', 'w', encoding='utf-8') as f:
        f.write(text_content)

    await browser.close()

asyncio.get_event_loop().run_until_complete(main())
