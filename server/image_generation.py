import requests
import json
import time
import os
from dotenv import load_dotenv

load_dotenv()

wombo_key = os.getenv('WOMBO_KEY')

BASE_URL = "https://api.luan.tools/api/tasks/"
HEADERS = {
    'Authorization': f'Bearer {wombo_key}',
    'Content-Type': 'application/json'
}


def send_task_to_dream_api(style_id, prompt, target_img_path=None):

    generate_payload = {'use_target_image': 'false'}
    post_response = requests.post(BASE_URL, json = generate_payload, headers=HEADERS)
    task_id = post_response.json()["id"]
    task_url = f"https://api.luan.tools/api/tasks/{task_id}"
    put_payload = json.dumps({            
    "input_spec": {                    
    "style": style_id,                    
    "prompt": prompt,                    
    "target_image_weight": 0.1,                    
    "width": 1300,                    
    "height": 800   
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
    
    return img_url
    


prompt = "Rhaenyra returns to King's Landing, prematurely ending an unsuccessful months-long tour to choose a consort."

send_task_to_dream_api(11, "Background wallpaper for comic generator app")