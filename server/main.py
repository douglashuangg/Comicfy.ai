from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import dotenv

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

    sentiment_analyzed = analyze_sentiment(prompt)
    overall_sentiment = sentiment_analyzed[1]
    sentences = sentiment_analyzed[0]

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
