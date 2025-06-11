from langchain_comunity.document_loaders import PyPDFLoader

# class GenAI():

#     def __init__(self, filename):
#         self.filename = filename

#     def embedding(content):
#         embeddings = OllamaEmbeddings(model='llama3.2')
        

#     def docSplitter(docs):
#         textSplitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, add_start_index=True)
#         allSplits = textSplitter.split_documents(docs)

#         return allSplits

#     def loadDoc(self):
#         loader = PyPDFLoader(self.filename)
#         docs = loader.load()
        
#         return docs

# filename = "path to file.pdf"

# # load pdf
# loader = PyPDFLoader(filename)
# docs = loader.load()

# #split text
# textSplitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
# allSplits = textSplitter.split_documents(docs)

# #embed chunks
# embeddings = OllamaEmbeddings(model='llama3.2')
# #vectors for only the first bit
# vector 1 = embeddings.embed_query(allSplits[0].page_content)

# #add to vector store
# vectorStore = MongoDBAtlastVectorSearch(
#     embedding=embeddings,
#     collection = "collection name"
#     index_name = "name of index search"
#     relevance_score_fn = "cosine"
# )




from flask import Flask, jsonify, request
from pocketbase import PocketBase

client = PocketBase("http://address")

app = Flask(__name__)

@app.route("/")
def test():
    return {"status": 200}

@app.get("/data/fetch")
def fetchData():
    try:
        results = client.collection("Wiki").getFullList()
        return jsonify(results)
    except:
        return {"status": 400}

@app.post("/data/post")
def POSTData():
    try:
        data = request.get_json()
        client.collection("Wiki").create(data)
        return {"status": 200}
    except:
        return {"status": 400}

@app.update("/data/update")
def UPDATEData():
    try:
        data = request.get_json()
        client.collection("Wiki").update(data.id, data)
        return {"status": 200}
    except:
        return {"status": 400}

@app.delete("/data/delete")
def DELETEData():
    try:
        client.collection("Wiki").delete(id)
        return {"status": 200}
    except: 
        return {"status": 400}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)





# read this: https://python.langchain.com/docs/tutorials/retrievers/#documents-and-document-loaders
# useful video: https://www.youtube.com/watch?v=JEBDfGqrAUA