import asyncio
import os
from dotenv import load_dotenv
from googlesearch import search
from pyppeteer import launch
import google.generativeai as genai


def get_top_3_websites(query):
    try:
        search_results = search(query, num_results=3)
        return search_results
    except Exception as e:
        print("An error occurred:", e)

async def main():
    data=[]
    full = """superstar rajnikanth does skydiving with bear grylls"""

    load_dotenv()
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
    model = genai.GenerativeModel('gemini-1.0-pro-latest')
    response = model.generate_content(full + " generate one question to ask a search engine about the above information - return a string")
    final = response.text
    print(final)
    sites = get_top_3_websites(final)
    for i in sites:
        print(i)
    for i in sites:
        browser = await launch()
        page = await browser.newPage()
        await page.goto(i, timeout=100000)
        text_content = await page.evaluate('''() => {
            return document.body.innerText;
        }''')
        data.append(text_content)
        await browser.close()
    text_data=""
    for i in data:
        text_data+=i+"\n\n"
    f = open("spider.txt", "w")
    f.write(text_data)
    f.close()
    print()
    print()
    response = model.generate_content(text_data + " < - - -  this is the correct data - based on this data tell me if this contains any factual errors - give response as if you're a fact validator - if yes, specify every factual error and state the truth from this (give response in 100 words) ... if the provided small data does not match with the big data (true) consider it as a factual error"+full)
    final = response.text
    print(final)
asyncio.get_event_loop().run_until_complete(main())
