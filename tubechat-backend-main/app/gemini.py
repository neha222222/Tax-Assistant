import pathlib
import textwrap
import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()
GOOGLE_API_KEY = os.getenv('google_api_key')

genai.configure(api_key=GOOGLE_API_KEY)
def gemini_response(content,query):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(f"""Based on the content please answer the query asked , note that the context is from youtube transcript and notice that there
                                       is a time stamp and duration of each particular sentence, Content : """ + content + "the user query is Query: "+ f"""{query}""")

    # print(response.text)
    return response.text


# if __name__ =="__main__":
#    main()
  