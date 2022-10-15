from fastapi import FastAPI
import dotenv
import cohere
import cohere.classify
import os
import numpy as np

dotenv.load_dotenv()

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/sheesh/{paragraph}")
def splitAndSentiment(paragraph : str):
    # sentiment decoding
    sentiment_decode = ['scary', 'furious', 'sad', 'joyful']

    # set up cohere client
    coClient = cohere.Client(f'{ os.getenv("COHERE_KEY") }')

    # splits paragraph into arr of sentences
    sentences = paragraph.split('.')
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


    # dict of key1 = sentences, key2 = sentiment
    sentencesAndSentiment = {
        "sentences": sentences,
        "overall_sentiment": f"{sentiment_decode[int(overall_mood_index)]}"
    }

    return sentencesAndSentiment
