import base64
import requests
import json

url = "https://api.veryfi.com/api/v8/partner/bank-statements"

# ADD YOUR KEYS HERE
CLIENT_ID=""
AUTH=""

payload = json.dumps({
    "file_data": base64.b64encode(open("main.pdf", "rb").read()).decode('utf-8'),
})

headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'CLIENT-ID':CLIENT_ID,
  'AUTHORIZATION': AUTH
}

response = requests.request("POST", url, headers=headers, data=payload)

if 200 <= response.status_code <= 299:
    data = response.json()
    print(json.dumps(data, indent=2))
else:
    print(f"Error {response.status_code}: {response.text}")

