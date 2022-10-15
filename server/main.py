from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import dotenv
import cohere
import cohere.classify
import os
import numpy as np
from img_gen_boosted import generate_images
from sentiment import analyze_sentiment

dotenv.load_dotenv()
app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Data(BaseModel):
    paragraph: str

class Payload(BaseModel):
    sentences: List[str]

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/analyze")
def parse_text(paragraph : Data):
    # sentiment decoding
    prompt = paragraph.paragraph

<<<<<<< HEAD
    # set up cohere client
    coClient = cohere.Client(f'{ os.getenv("COHERE_KEY") }')

    # splits paragraph into arr of sentences
    sentences = prompt.split('.')
    sentence_moods = []
    for index in range(len(sentences)):

        response = coClient.classify(
            # specifying the model type
            model = 'medium',

            # input to feed to cohere sentence mood classifier
            inputs = [f'{ sentences[index] }'],

            # samples to classify into desired moods [scary, furious, sad, joyful]
            examples=[
                cohere.classify.Example('It was horrible, there were ghosts everywhere!', 'scary'),
                cohere.classify.Example('The warfare was brutal, they wouldn\'t even spare the women nor the children', 'scary'),
                cohere.classify.Example('The officials were dumbfounded by the fact that there was a coaltion army against them', 'scary'),
                cohere.classify.Example('The men and women were shocked by the horrifying discovery.', 'scary'),
                cohere.classify.Example('The hostages were scared that the criminals might shoot them.', 'scary'),
                 
                cohere.classify.Example('The enemy faction began to invade our territory, the event was outrageous.', 'furious'),
                cohere.classify.Example('After the crimes committed, the state decided to conscript every able person.', 'furious'),
                cohere.classify.Example('The King was angered by the probability of facing complete annihilation by the enemy.', 'furious'),
                cohere.classify.Example('The person began punching and kicking in frustration over their undesired position.', 'furious'),
                cohere.classify.Example('This code has frustrated the developer for hours now because he could not figure out the issue.', 'furious'),

                cohere.classify.Example('The entire infantry was battered, leaving a sole survivor.', 'sad'),
                cohere.classify.Example('The late army apologized as the families that were lost could not be recovered.', 'sad'),
                cohere.classify.Example('Everyone was saddened to see the old King go.', 'sad'),
                cohere.classify.Example('Today, they attended the grave of a long lost friend and couldn\'t help but cry.', 'sad'),
                cohere.classify.Example('He had not experienced more grief in his life than in that sad moment.', 'sad'),

                cohere.classify.Example('At long last, the army had conquered the enemy state.', 'joyful'),
                cohere.classify.Example('The family was relieved to see that she returned home safely.', 'joyful'),
                cohere.classify.Example('They were overjoyed when the student made it to their desired university!', 'joyful'),
                cohere.classify.Example('They felt great as they finally receieved a break from working tirelessly.', 'joyful'),
                cohere.classify.Example('Robb grinned and looked up from the bundle in his arms.', 'joyful'),
                cohere.classify.Example('Excitement overwhelmed them when they receieved recognition for their work.', 'joyful'),
                cohere.classify.Example('Jerry saved the day, donating 50% of his savings to the poor.', 'joyful'),
                cohere.classify.Example('The rain disappeared, and it left a rainbow in its wake.', 'joyful'),
                cohere.classify.Example('She won the lottery, so she jumped with joy.', 'joyful'),
                cohere.classify.Example(' The earth was saved by all the police and firemen, present in society today.', 'joyful'),
                cohere.classify.Example('She recieved a passing grade on her exam, completing her final university course. ', 'joyful'),
                cohere.classify.Example('Ella smiles and accepts her new life as a goddess.', 'joyful'),
            ]
        )   

        # encoding mood as an probability distribution
        mood_encoding = [
            response.classifications[0].labels['scary'].confidence,
            response.classifications[0].labels['furious'].confidence,
            response.classifications[0].labels['sad'].confidence,
            response.classifications[0].labels['joyful'].confidence,
        ]

        # sentence paired with sentiment for each sentence 
        sentences[index] = sentences[index].strip()
        sentence_moods.append(int(np.argmax(mood_encoding)))

    # get most frequent element
    sentence_moods.sort()
    counter = 0
    overall_mood_index = sentence_moods[0]
     
    # gets the most frequent appearing mood and sets as overall mood
    for i in sentence_moods:
        curr_frequency = sentence_moods.count(i)
        if(curr_frequency> counter):
            counter = curr_frequency
            overall_mood_index = i
=======
    sentiment_analyzed = analyze_sentiment(prompt)
    overall_sentiment = sentiment_analyzed[1]
    sentences = sentiment_analyzed[0]
>>>>>>> 26221a0d47d50a36bbedb1a44798ee6e1b92d3ea

    # dict of key1 = sentences, key2 = sentiment
    sentences.sort()
    sentencesAndSentiment = {
        "sentences": sentences[max(0, len(sentences) - 6) : len(sentences)], # grabbing the top six longest sentences (for now) :: TODO -> get the 6 most relevant sentences
        "overall_sentiment": f"{overall_sentiment}"
    }

    return sentencesAndSentiment


@app.post("/generate")
def generate(payload : Payload):
    prompts = payload.sentences
    return { "image_urls" : generate_images(prompts) }
