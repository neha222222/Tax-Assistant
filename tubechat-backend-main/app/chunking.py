from langchain.text_splitter import RecursiveCharacterTextSplitter,CharacterTextSplitter
from dotenv import load_dotenv
import urllib
import requests
import xmltodict, json
import os
from angle_emb import AnglE
import os
from pinecone import Pinecone

def get_transcipt(video_id:str ):
    try:
        link = f"https://youtubetranscript.com/?server_vid2={video_id}"
        f = requests.get(link)
        o = xmltodict.parse(f.text)
        o = o["transcript"]["text"]

        text = ""
        for i in o:
            text += str(i["@start"]) + ":" + str(i["#text"]) + " duration: "+ i["@dur"] +  "\n"
        return text
    except:
        return "transcript is disabled for this video"


def split_docs(text, chunk_size, chunk_overlap=50):
    print("size of chunk is ",chunk_size)
    print("*"*50)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    docs = text_splitter.split_text(text)
    print("length of docs is ",len(docs))
    return text_splitter.create_documents(docs),docs

load_dotenv()
HF_TOKEN = os.getenv("hf_token")

def persist_dir(chunks,video_id):
    
    angle = AnglE.from_pretrained('WhereIsAI/UAE-Large-V1', pooling_strategy='cls').cuda()
    # print
    vecs = angle.encode(chunks, to_numpy=True)
    print(vecs)
    print("Saving to db...")
    
    pc = Pinecone(api_key="6ee070dd-4af5-43a1-9abd-9f83426dda8c")
    index = pc.Index("pulpy")
    data_list = []
    # chunk = str(test["conversations"])
    for i in range(len(chunks)):

        metadata = {}
        metadata["chunk_id"] = video_id
        metadata["text"] = chunks[i]
        metadata["valid_chunk"] = True

        test_ins = {
                "id": video_id + f"_{i}", 
                "values":vecs[i], 
                "metadata": metadata
            }
        print("adding to data list")
        data_list.append(test_ins)
    index.upsert(vectors=data_list,namespace= "ns1")
    
    print("stored to database")
    
# if __name__ == "__main__":
#     content = get_transcipt("UIkK1skhy9A")
#     docs,chunks = split_docs(content,2000)
#     persist_dir(chunks,"UIkK1skhy9A")
    