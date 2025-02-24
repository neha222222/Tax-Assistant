import urllib
import requests
import xmltodict, json
def get_transcipt(video_id:str ):
    link = f"https://youtubetranscript.com/?server_vid2={video_id}"
    f = requests.get(link)
    o = xmltodict.parse(f.text)
    o = o["transcript"]["text"]

    text = ""
    for i in o:

        text += str(i["@start"]) + ":" + str(i["#text"]) + " duration: "+ i["@dur"] +  "\n"
    print(text)
    return text

# if __name__ == "__main__":
#     get_transcipt("UIkK1skhy9A")
