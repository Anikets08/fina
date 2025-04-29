# Steps
# Hot do i generate json from pdf [BANK STATEMENT]
- make sure to add values to these variables in pdf2json.py you can create one from api.veryfi.com
  - CLIENT_ID
  - AUTH
  
and then run

``
python pdf2json.py
``

once the json is printed you can add this to a create a new json
file and add it in /backend/jsons

# How do i start api
- ``touch .env``
- make sure to add these variables in .env file
  - OPENAI_API_KEY
  - PINECONE_API_KEY
  - LANGSMITH_API_KEY
- make sure you have all the dependencies installed from requirement.txt

then run below code

``
 fastapi dev backend/main.py
``

# How do i run frontend app
- npm i
- npm run dev


