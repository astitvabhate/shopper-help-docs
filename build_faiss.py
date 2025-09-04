from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings

# Load the markdown file created by MkDocs (main entrypoint is index.md)
loader = TextLoader("./helpdocs/docs/index.md")
docs = loader.load()

# Split docs into chunks for better retrieval
chunks = RecursiveCharacterTextSplitter(
    chunk_size=500,  # you can try 300/400 if needed
    chunk_overlap=50
).split_documents(docs)

# Use HuggingFace embeddings
embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Build FAISS index
db = FAISS.from_documents(chunks, embedding)

# Save FAISS index to disk
db.save_local("faiss_index")

print("✅ FAISS index created successfully in ./faiss_index/")
