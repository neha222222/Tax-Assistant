from pinecone import Pinecone
from angle_emb import AnglE
from dotenv import load_dotenv
import os
load_dotenv()
load_dotenv()
HF_TOKEN = os.getenv("hf_token")
def get_relevant_context(query,video_id):
    angle = AnglE.from_pretrained('WhereIsAI/UAE-Large-V1', pooling_strategy='cls').cuda()
        # print
    vecs = angle.encode(query, to_numpy=True)
    pc = Pinecone(api_key="6ee070dd-4af5-43a1-9abd-9f83426dda8c")
    index = pc.Index("pulpy")
    # print("pinecone is setup")
    result = index.query(
    vector=vecs[0].tolist(),
    filter={
        "chunk_id": video_id,
    },
    namespace="ns1",
    top_k=8,
    include_metadata = True
)

    context = ""
    for i in result.matches:
        context+=i.metadata["text"]


    print(context)
    return context


if __name__ =="__main__":
    get_relevant_context("Based on these descriptions","UIkK1skhy9A")
