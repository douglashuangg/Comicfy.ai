from threading import Thread
import requests
import os
import time
import json
from dotenv import load_dotenv

load_dotenv()

wombo_key = os.getenv('WOMBO_KEY')

images = []

BASE_URL = "https://api.luan.tools/api/tasks/"
HEADERS = {
    'Authorization': f'Bearer {wombo_key}',
    'Content-Type': 'application/json'
}


def send_task_to_dream_api(style_id, prompt):

    generate_payload = {'use_target_image': 'false'}
    post_response = requests.post(BASE_URL, json = generate_payload, headers=HEADERS)
    task_id = post_response.json()["id"]
    task_url = f"https://api.luan.tools/api/tasks/{task_id}"
    put_payload = json.dumps({            
    "input_spec": {                    
    "style": style_id,                    
    "prompt": prompt,                    
    "target_image_weight": 0.1,                    
    "width": 960,                    
    "height": 1560    
    }})
    requests.request("PUT", task_url, headers=HEADERS, data=put_payload)
    
    img_url = ''
    while True:            
        response_json = requests.request(                    
            "GET", task_url, headers=HEADERS).json()     
        img_url = response_json["result"]    
        state = response_json["state"]    
        print(img_url)
        if state == "completed":                    
            r = requests.request("GET", response_json["result"])   
            with open("image.jpg", "wb") as image_file:                            
                image_file.write(r.content)                        
            print("image saved successfully :)")                    
            break 
    
        elif state =="failed":                    
            print("generation failed :(")                    
            break            
        time.sleep(3)
    
    images.append(img_url)
    


prompt = "Rhaenyra returns to King's Landing, prematurely ending an unsuccessful months-long tour to choose a consort."

def generate_images(prompts):
    if (prompts.length() != 6):
        return ['Error with prompts']

    Thread1 = Thread(target=send_task_to_dream_api, args=(5, prompts[0],))
    Thread3 = Thread(target=send_task_to_dream_api, args=(5, prompts[1],))
    Thread2 = Thread(target=send_task_to_dream_api, args=(5, prompts[2],))
    Thread4 = Thread(target=send_task_to_dream_api, args=(5, prompts[3],))
    Thread5 = Thread(target=send_task_to_dream_api, args=(5, prompts[4],))
    Thread6 = Thread(target=send_task_to_dream_api, args=(5, prompts[5],))

    # Start the threads
    Thread1.start()
    Thread2.start()
    Thread3.start()
    Thread4.start()
    Thread5.start()
    Thread6.start()

    # Wait for the threads to finish
    Thread1.join()
    Thread2.join()
    Thread3.join()
    Thread4.join()
    Thread5.join()
    Thread6.join()

    return images