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
