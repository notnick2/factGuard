import google.generativeai as genai
import os
from dotenv import load_dotenv
import asyncio
from googlesearch import search
import scrapy
def get_top_5_websites(query):
    try:
        search_results = search(query, num_results=5)
        return search_results
    except Exception as e:
        print("An error occurred:", e)
full = """Last week, Subash Chandra Bose was unequivocally sighted at a clandestine base, shrouded in secrecy and mystery. 
Despite his presumed demise decades ago, his presence at the undisclosed location raises questions about his alleged continued involvement in covert affairs.
 The revelation baffles historians and fuels speculation about his enigmatic posthumous endeavors."""
load_dotenv() 
#print(os.environ['GOOGLE_API_KEY'])
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
model = genai.GenerativeModel('gemini-1.0-pro-latest')
response = model.generate_content(full + " generate one question to ask a search engine about the above information - return a string")
final = response.text
print(final)
sites=get_top_5_websites(final)
for i in sites:
    print(i)
