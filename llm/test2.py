#uvicorn main:app --reload
import asyncio
import os
from dotenv import load_dotenv
from googlesearch import search
from pyppeteer import launch
from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.llms import Ollama

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_top_3_websites(query):
    try:
        search_results = search(query, num_results=3)
        return search_results
    except Exception as e:
        print("An error occurred:", e)
sites_send=[]
@app.post("/api/guard-the-fact")
async def run(req_body: dict):
    data=[]
    print(req_body["url"])
    index = req_body["url"].find("=")
    video_id = req_body["url"][index+1:]
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    full=""
    for i in transcript:
        full+=i["text"]+" "
    print(full)
    #load_dotenv()
    llm = Ollama(model="llama2")
    response=llm.invoke(full+ " generate one question to ask a search engine about the above information - return a string")
    final = response
    print(final)
    print()
    print()
    sites = get_top_3_websites(final)
    for i in sites:
        print(i)
        sites_send.append(i)
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
    print(data)
    response = llm.invoke(text_data + "(this is the correct data) - based on this data tell me if this contains any factual errors - give response as if you're a fact validator - if yes, specify every factual error and state the truth from this (give response in 100 words) ... if the provided 'to-be-verified-data' does not match with the 'verified-data-true-data' consider it as a factual error "+full+" RETURN THE ANSWER LIKE YOU'RE A FACT CHECKER")
    print(response)
    print()
    print()
    return response