
# Youtube Buddy

## How to run the project

1. Clone the repository
2. `cd frontend`
3. Run `yarn install` to install the dependencies
4. Run `yarn start` to start the project, Now the frontend will be running on `http://localhost:3000`
5. Go to `http://localhost:3000`
6. Download the Chrome extension from the top right corner of the page via clicking on download tubechat

![download_tubechat](images/download_tubechat.png)

7. Unzip the downloaded zip file(use the existing zip file) and open chrome and go to `chrome://extensions/`
8. Click on "Load unpacked"
9. Select the `dist` folder inside your unzipped tubechat-extension folder.

![load_unpacked](images/dist_folder.png)

10. Now go to any youtube video and You must see the extension inserted in the youtube dom itself.

![extension_in_youtube](images/extension_in_youtube.png)

11. Now lets start the **backend server**, go to backend folder and run the following command


```bash
cd ..
cd backend
docker build -t tubechat .
docker run -d -p 8000:8000 tubechat

```
tubechat backend will be running on `http://localhost:8000`

![backend_running](images/bacend_endpoints.png)

12. Now we can talk on any youtube. Just visit any youtube video, a chat window will open, login in it 

Youtube Buddy is a chrome extension that allows you to talk with youtube videos.



## Design Implementation 

- Talk to youtube videos
- Watch video in Multilingual Languages
![Working Diagram](images/workflow_diagram.png)

## Figma Design Files
https://www.figma.com/design/5rBFtL5t4HbwSi7FqnScN3/main?node-id=0-1&t=YA7Zb2lnpHT9aOQd-1


### Frontend
[frontend_working.webm](https://github.com/user-attachments/assets/1726f7de-335f-4ae2-bd12-b68735c557f3)

### Backend and Database
[Backend_endpoints_working.webm](https://github.com/user-attachments/assets/ebcff7a3-5a07-4430-afca-5e54ac1a7d1a)


### Extension 

https://github.com/user-attachments/assets/9f10bb3a-89e8-4000-bf11-2487b7084cfb




