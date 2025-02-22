# Tax-Assistant
A Tax Assistant that helps you file your taxes easily using AI.

## System Architecture
![Blank diagram - Page 2](https://github.com/user-attachments/assets/b05a729b-904d-4327-b71d-0dc0ff1ae847)

### Core Components

#### Frontend
- Streamlit-based UI providing interactive user experience

#### Backend Services
1. **API Gateway**
   - Single entry point for frontend requests
   - Handles authentication, routing and load balancing
   - Tech: FastAPI

2. **User Service** 
   - Manages user profiles and authentication
   - Handles registration, login and sessions
   - Tech: FastAPI, PostgreSQL

3. **Tax Computation Service**
   - Calculates taxes based on user data
   - Applies tax rules and provides recommendations
   - Tech: FastAPI, PostgreSQL

4. **AI Decision Engine**
   - Provides personalized tax-saving suggestions
   - Analyzes tax history and predicts liability
   - Tech: TensorFlow/PyTorch, FastAPI

5. **RealTime Contex Analyser**
    -Scrap Data Continuosly
    -Passing it as context for ai decision engine

### Data Flow
1. User interacts with Streamlit UI
2. API Gateway routes requests to appropriate service
3. Tax Computation Service processes data
4. Reatime Contex  Analyser scrap data
4. AI Engine provides recommendations
5. Results returned to user

### Deployment
- All services containerized using Docker
- Auto-scaling enabled for high availability
- Hosted on AWS cloud infrastructure

## 📌 Low-Level Design (LLD) for Tax Assistant

```
Folder Structure
tax-assistant/
│── backend/
│   ├── api_gateway/
│   │   ├── main.py
│   │   ├── auth_middleware.py
│   │   ├── config.py
│   ├── user_service/
│   │   ├── models.py
│   │   ├── routes.py
│   │   ├── main.py
│   ├── tax_computation_service/
│   │   ├── models.py
│   │   ├── routes.py
│   │   ├── tax_logic.py
│   │   ├── main.py
│   ├── ai_engine/
│   │   ├── ai_model.py
│   │   ├── inference.py
│   │   ├── main.py
│   ├── realtime_context_analyzer/
│   │   ├── scraper.py
│   │   ├── parser.py
│   │   ├── main.py
│   ├── config/
│   │   ├── database.py
│   │   ├── settings.py
│── frontend/
│   ├── app.py
│   ├── ui_components/
│   ├── assets/
│── database/
│   ├── init.sql
│── docker-compose.yml
│── README.md
│── .env
```

### 🔹 API Design
1️⃣ API Gateway (FastAPI)
🔹 Routes

| Method | Endpoint                  | Description                               |
|--------|---------------------------|-------------------------------------------|
| POST  | /auth/login               | User login                                |
| POST   | /auth/register            | User registration                         |
| GET    | /user/profile             | Fetch user profile                        |
| POST   | /tax/compute              | Compute tax                              |
| GET    | /tax/recommendations      | Get AI-based tax recommendations          |
| GET    | /news/latest              | Get latest tax-related news               |


2️⃣ User Service (FastAPI)
🔹 Routes

| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| POST   | /register         | Create new user      |
| POST   | /login            | Authenticate user     |
| GET    | /profile/{user_id}| Get user details     |


3️⃣ Tax Computation Service (FastAPI)
🔹 Routes

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | /compute          | Calculate tax liability     |
| GET    | /history/{user_id}| Fetch tax history           |
### 4️⃣🔹Business Logic (Tax Calculation)


| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| POST   | /predict          | Generate tax-saving recommendations |

🔹 AI Model

### 5️⃣ RealTime Context Analyzer (Scraping Service)
🔹 Routes
| Method | Endpoint | Description               |
|--------|----------|---------------------------|
| GET    | /scrape  | Fetch latest tax news     |
