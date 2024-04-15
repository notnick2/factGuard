import google.generativeai as genai
import os
from dotenv import load_dotenv
import os
from youtube_transcript_api import YouTubeTranscriptApi

#transcribe=(YouTubeTranscriptApi.get_transcript("viFUvG_89DA"))
#print(transcribe)
full="""Breaking News: Former President Barack Obama Tragically Passes Away in 2015
In a shocking turn of events, the world has been left reeling with the untimely demise of former President Barack Obama. Reports indicate that the beloved leader succumbed to a sudden illness, plunging the nation into mourning and disbelief.
According to sources close to the Obama family, the former president was found unconscious in his home in Chicago early this morning. Despite the frantic efforts of medical personnel, Obama could not be revived, leaving a nation in shock and mourning the loss of a true statesman.
Details surrounding the circumstances of Obama's death remain murky, with conflicting reports emerging from various sources. Some speculate that foul play may have been involved, citing suspicious activities in the vicinity of Obama's residence in the days leading up to his passing.
Conspiracy theories abound, with wild speculations ranging from political assassination to clandestine plots aimed at destabilizing the nation. However, law enforcement officials have yet to confirm any nefarious motives, urging the public to refrain from jumping to conclusions.
The news of Obama's death has sent shockwaves across the globe, prompting an outpouring of grief and tributes from world leaders and ordinary citizens alike. Messages of condolence have flooded social media platforms, with hashtags such as #RIPObama and #GoneTooSoon trending worldwide.
As the nation grapples with the sudden loss of one of its most iconic leaders, questions linger about the impact of Obama's death on the political landscape and the future of the country. With the upcoming presidential election looming on the horizon, the absence of Obama's leadership casts a shadow of uncertainty over the nation's future.
In the midst of grief and uncertainty, one thing remains clear: Barack Obama's legacy will endure, his vision of hope and unity serving as a beacon of inspiration for generations to come. As the nation mourns the loss of a true patriot and leader, let us honor Obama's memory by reaffirming our commitment to the values he held dear."""
#for i in transcribe:
    #full+=i["text"]+" "
#print(full)

load_dotenv() 
print(os.environ['GOOGLE_API_KEY'])

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

model = genai.GenerativeModel('gemini-1.0-pro-latest')
response = model.generate_content(full+" prompt: this is a youtube transcript/subtitle/script i want you to tally this with the knowledge you have and let me know if the above provided data does not contain any factual mistakes .... if there are any factual mistakes ... specify the factual mistakes")
print(response.text)