from langchain_comunity.document_loaders import PyPDFLoader


class GenAI():

    def __init__(self, filename):
        self.filename = filename

    def embedding(content):
        embeddings = ollama.embed(model='llama3.2', input=content)
        return embeddings

    def docSplitter(docs):
        textSplitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, add_start_index=True)
        allSplits = textSplitter.split_documents(docs)

        return allSplits

    def loadDoc(self):
        loader = PyPDFLoader(self.filename)
        docs = loader.load()
        
        return docs


-
documentInput = input("file path for doc: ")

ai = GenAI(documentInput)

if ".pdf" in documentInput:
    docs = loadDoc(documentInput)
    splits = docSplitter(docs)
    vectors = []
    for (split in splits):
        vecotrs.append(embedding(split.page_content))

    #add vectors to mongodb


if ".pdf" in documentInput:
    docs = ai.loadDoc()
    splits = ai.docSplitter(docs)
    vectors = []
    for (split in splits):
        vectors.append(ai.embedding(split.page_content))





# read this: https://python.langchain.com/docs/tutorials/retrievers/#documents-and-document-loaders