import app.cohere as cohere

def cohere_response(content,query):

    co = cohere.Client('AtN876t4G2M26jl3vu9DWRgb1ZhqntxNe6q0kzOf')
    # response = co.generate(f"""Based on the content please answer the query asked , note that the context is from youtube transcript and notice that there
    #                                    is a time stamp and duration of each particular sentence, Content : """ + content + "the user query is Query: "+ f"""{query}""")
    response = co.generate("who are you bro")
    print(response)
    return response

if __name__ == "__main__":
    cohere_response("abc","abc")