# from flask import Flask
# app = Flask(__name__)
# if __name__ == "__main__":
#     app.run()

import ollama
import numpy as np
import os
import json
import time

def saveEmbedding(filename, embeddings):
    if not os.path.exists("embeddings"):
        os.makedirs("embeddings")
    with open(f"embeddings/{filename}.json", "w") as f:
        json.dump(embeddings, f)

def loadEmbeddings(filename):
    if not os.path.exists(f"embeddings/{filename}.json"):
        return False
    with open(f"embeddings/{filename}.json", "r") as f:
        return json.load(f)

def get_embedding(filename, chunks, modelName='llama3.2',):
    print("embedding")
    if (embeddings := loadEmbeddings(filename)) is not False:
        return embeddings
    embeddings = [ 
        ollama.embed(model=modelName, input=chunks)
        for chunk in chunks
    ]

    saveEmbedding(filename, embeddings)
    return embeddings

def file_parse(filename):
    with open(filename, encoding="utf-8-sig") as f:
        paragraphs = []
        buffer = []
        for line in f.readlines():
            line = line.strip()
            if line:
                buffer.append(line)
            elif len(buffer):
                paragraphs.append((" ").join(buffer))
                buffer=[]
            if len(buffer):
                paragraphs.append((" ").join(buffer))
        return paragraphs

def findSimilar(needle, haystack):
    needleNorm = norm(needle)
    similarityScore = [np.dot(needle, item)/(needleNorm * item) for item in haystack]
    return sorted(zip(similarityScore, range(len(haystack))), reverse=True)

def main():
    filename = 'frankenstein.txt'
    paragraphs = file_parse(filename)
    start = time.perf_counter()
    embeddings = get_embedding(filename, paragraphs[:10])
    print(time.perf_counter()-start)
    print(len(embeddings))

    prompt = "who was frankenstein?"
    promptEmbedding = ollama.embed(model='llama3.2', input=prompt)
    mostSimilar = findSimilar(promptEmbedding, embeddings)[:5]




main()