from flask import Flask, jsonify, request
from flask_cors import CORS
import ollama
import pymongo
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader


app = Flask("__name__")
CORS(app)

myClient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myClient["WikiDB"]
embeddingDB = mydb["embedding"]
fileDB = mydb["fileData"]

## local functions


def chunking(docs):
    for i in docs:
        print(i)

# embed text
def embeddingText(chunks):
    try:
        embedded = ollama.embed(model='llama3.2', input=chunks)
        embeddingDB.insert_one(embedded)
        return embedded
    except:
        return "something is wrong"

#llm request
    # rag request

# chunking


## server functions
@app.route("/")
def test():
    return "success"

# add to db
@app.post("/add")
def AddData():
    json = request.get_json()
    #loader = PyPDFLoader(json["file"])
    #chunking(loader.load())
    try:
        fileDB.insert_one(json)
    except:
        return "something went wrong"
    
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
@app.patch("/update")
def updateData():
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
    app.run(host="0.0.0.0", port=5050, debug=True)