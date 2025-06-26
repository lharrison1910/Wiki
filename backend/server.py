#import string
from flask import Flask, jsonify, request
from flask_cors import CORS
#import ollama
import pymongo
#from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader
#import random
#import requests

'''
Update to do http requests rather than using the library for easier docker integration
https://github.com/ollama/ollama/blob/main/docs/api.md#generate-embeddings - api ref
https://medium.com/@siftikharm/build-your-own-llm-with-ollama-docker-fastapi-guide-eb49453548e2 - look how api is structured
'''

app = Flask("__name__")
CORS(app)

myClient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myClient["WikiDB"]
embeddingDB = mydb["embedding"]
fileDB = mydb["fileData"]



# def generateID():
#     length = 20
#     generated = "".join(random.choice(string.ascii_lowercase) for _ in range(length))
#     return generated


# def ChunkEmbed(file):
#     # get file type, either pdf or docx
#     embeddingsData = []
#     if (".pdf" in file.name ):
#         loader = PyPDFLoader(file_path)
#     else:
#         loader = Docx2txtLoader(file_path) 
    
#     for page in loader.load():
#         # I think i need to chunk page_content?
#         page_embeddings = ollama.embed(model='llama3.2', input=page.page_content)["embedding"]
#         #I'm not sure if this will work as expected
#         embeddingsData.append({"id": generateID(), "file": file.id}, "embeddings": {"meta": page["metadata"], "embedding": page_embeddings})





# def LLMIntegration(prompt):
#     res = requests.post('http://localhost:11434/api/chat', json={
#         "model": 'llama3.2',
#         "prompt": prompt,
#         "stream": False
#     })

#     print(res.json())


## server functions
@app.route("/")
def test():
    return "success"

# add to db
@app.post("/post")
def AddData():
    json = request.get_json()
    file = request.files['file']
    print(file)
    print(json)
    try:
        fileDB.insert_one(json)
    except:
        return "something went wrong"
    
    
    #ChunkEmbed(json["file"])
    #if got this far, send file data to local functions

# delete from db
@app.delete("/delete")
def DeleteData():
    data = request.get_json()
    try:
        fileDB.delete_one(data)
    except:
        return "something went wrong"
    
    #try delete embedding data
    return 

# update db
@app.patch("/patch")
def patchData():
    data= request.get_json()
    try:
        fileDB.update_one(data["old"], data["new"])
    except:
        return "something went wrong"

# read from db
@app.get("/fetch")
def fetchData():
    data = []
    for x in fileDB.find():
        document = {
            "id": x["id"],
            "name": x["name"]
        }

        data.append(document)
    return jsonify(data)



if "__main__" == __name__:
    app.run(debug=True, port=5050, host="0.0.0.0")