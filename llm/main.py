from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs
from openai import OpenAI
from tavily import TavilyClient
from flask import Flask, jsonify, request, g
from flask_cors import CORS
import ollama
import os


app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
app.secret_key = os.urandom(24)


openai_api_key = "sk-proj-qZrOzFSHJWLSY1r9wiP8T3BlbkFJ2YttO1vbjTtcYqfjeRyZ"
travily_api_key = "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"

client = OpenAI(api_key=openai_api_key)
tavily = TavilyClient(api_key=travily_api_key)


split_List = []

def splitFunction(List_content):
    global split_List
    split_List = List_content.split("!@#")
    return split_List

@app.route('/generate-response', methods=['POST'])
def generate_response():
    video_id = request.json.get('video_id')
    #video_id = request.args.get('video_id')
    print(video_id)
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    text = ""
    for i in transcript:
        text += i["text"] + " "
    print(text)
    List_response = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {
          "role": "system",
          "content": "You are a part of video factual verification system your job is to extract the crucial information/ facts from the given transcript and return them as headlines. as we are trying to verify the facts told in the video it might be that there may be few or more factual inaccuracies throughout the transcript but that is not your job to look into those, your job is to just return the crucial information/facts that are given in the prompt as headlines. list out all such crucial information/facts from the transcript. Make sure that you return only the crucial information/facts which is essential to be verified for the good of the general public all the other things in the transcript can be ignored. each fact/information should have the complete context so don't use pronoun and use respective nouns always.list them in a squence seperated by !@# no numbering or new lines"
        },
        {
          "role": "user",
          "content": "today i woke up and watching was watching TV then learned that modi has lost 2014 elections, my friend told that he turned a monk in 2015, I have read that he died in an air strike in 2026, today is my birthday and surprisingly today was the day he died today is 13th april"
        }
      ],
      temperature=1,
      max_tokens=1000,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0
    )
    
    # Extract response content
    List_content = List_response.choices[0].message.content
    split_List = splitFunction(List_content)
   # split_List = List_content.split("!@#")
    # Return the response to the frontend
    return jsonify(split_List)

def process_element(element):
    response = tavily.search(query=element, search_depth="advanced", include_answer=True, include_images=True)
    query = response["query"]
    answer = response["answer"]
    completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {
          "role": "system",
          "content": "given a statement and answer return boolean true or false. If the answer is opposite of statement then return false else return true."
        },
        {
          "role": "user",
          "content": "statment: " + query +" answer: " + answer
        }
      ],
      temperature=1,
      max_tokens=1000,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0
    )
    
    fact = completion.choices[0].message.content
    response["fact"] = fact
    print(response)
   # context = [{"url": obj["url"], "content": obj["content"]} for obj in response.results]
    return response



@app.route('/process')
def process_split_list():
    element = split_List.pop(0)
    context = process_element(element)
    return jsonify(context)


@app.route('/test')
def test():
    return 'Hello testing'


if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)

