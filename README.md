## Built and submitted to Hack the Valley 7

## 💡 Inspiration 
Whether its the most riveting story ever, or a boring one, sometimes we just don't want to have to read a wall of text. Whether you have trouble picturing the things you read, or simply find more excitement in pictures, our application strives to reimagine the way text can be consumed. Comicfy.AI aims to turn any piece of fiction, historical account, or life story into a visual experience.

## 🔍 What it does 
Comicfy.AI is a web application that brings your words to life through an AI powered visual story-telling experience. By providing a prompt, Comicfy.AI determines the key phrases to use as "comic panel" captions. We then use each sentence to generate its respective image. In addition, Comicfy.AI has been set up to where you can even listen to your story through the app's text-to-speech services. And if you really like, you may even toggle on background music that is determined by the mood that the prompt gives off! 

## ⚙️ How we built it
The front-end of our application was developed using React. We utilised multi-threading with Python in the backend to concurrently make API requests to Wombo and Cohere. We also built a custom algorithm to determine to most relevant sentences in a story. Our REST API was built using FastAPI (Python library). 

## 🚧 Challenges we ran into
Finding good APIs that have understandable and non-outdated documentation. Figuring out where to send data back and forth from the front to the backend for API calls to get sentiment and image generation and at what point to do the API calls to process the data. Making multiple API calls at the same time to speed up the time it takes to load the comic.

## 📚 Accomplishments that we're proud of
- Very smooth and efficient planning and development process
- Not giving up, successfully debugging any issues that we came across, and building a working demo
- Using multi-threading for the first time (surprisingly easy)

## 🔭 What we learned
Throughout Hack the Valley 7, we learned to work with API's and new JS libraries to achieve our desired goals of text-to-speech and playing soundtracks. We also learned how tackle CORS errors in our backend. 

## 🚀 What's next for comicfy.ai
Add dynamic panel capabilities to create more variety in the number and size of the comic panels. Improve image generation with different parameters to create more accurate images and incorporate a more realistic text-to-speech API with emotions.
