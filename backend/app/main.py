from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import re
from app.querying import get_relevant_context
from app.chunking import get_transcipt,split_docs,persist_dir
from app.gemini import gemini_response
from app.db_utils import check_video_id_existence,insert_video_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=['*']
)

@app.get("/add_and_check_video")
def add_check_video_db(video_id: str):
    if check_video_id_existence(video_id):
        return True

    try:
        video_context  = get_transcipt(video_id)
        if re.search("disabled", video_context, re.IGNORECASE):
           return False
        docs,chunks = split_docs(video_context,2000)
        print(video_context)
        print(len(video_context))
        print("chunks are ready")
        persist_dir(chunks,video_id)
        print("done adding to pinecone")
        data_dict = {
        "id":video_id
    }
        insert_video_data(data_dict)
        return True
    except Exception as e:
        print(e)
        return False
   



@app.get("/talk_with_pulpy")
def talking_pulpy(query,video_id):
    query_context = get_relevant_context(query,video_id)
    return gemini_response(query_context,query)





if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000, log_level="info")