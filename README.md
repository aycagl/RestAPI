# **Eco-Friendly Rest API Project**

The **Eco-Friendly Lifestyle** API helps users track eco-conscious habits by logging daily consumption data for food, trash, water, electricity, and transportation. It calculates a carbon footprint score and offers personalized recommendations to promote sustainable living. 

For example:
- Users with high food waste can receive nearby shelter locations for donations (via **Google Maps API**). 
- The API also provides actionable tips to:
  - Reduce trash,
  - Save water,
  - Use energy efficiently,
  - Opt for sustainable transportation alternatives.

---

## **Features**
- Track daily environmental impact data.
- Calculate personalized **carbon footprint scores**.
- Receive **custom recommendations** for sustainable living.
- Integrates with **Google Maps API** to provide location-based suggestions.

---

## **API Endpoints**

### **User Management**
- **`POST /users`** - Register a new user.
- **`POST /users/login`** - Authenticate a user.
- **`GET /users/{userId}/profile`** - Retrieve user profile, goals, and environmental impact statistics.

---

### **Consumption Data**
- **`POST /consumption/food`** - Log daily food consumption data.
- **`POST /consumption/trash`** - Log daily trash production data.
- **`POST /consumption/water`** - Log daily water consumption data.
- **`POST /consumption/electricity`** - Log daily electricity usage data.
- **`POST /consumption/transportation`** - Log daily transportation type, distance, and fuel type.

---

### **Carbon Footprint**
- **`POST /calculate/carbon-footprint`** - Calculate the user’s carbon footprint based on all logged consumption data.

---

### **Recommendations**
- **`GET /recommendations/food`** - Get recommendations to reduce food waste and view nearby shelters for donations (**Google Maps API** integration).
- **`GET /recommendations/trash`** - Receive trash reduction and recycling tips based on trash data.
- **`GET /recommendations/water`** - Get water-saving suggestions for high water consumption.
- **`GET /recommendations/electricity`** - Receive energy-saving tips and appliance recommendations.
- **`GET /recommendations/transport`** - Suggest alternative, eco-friendly transport options (e.g., biking, walking, public transport, etc.).

---

### **User Goals**
- **`POST /goals`** - Set daily or weekly sustainability goals.
- **`GET /goals/{userId}`** - Retrieve user-specific sustainability goals.

---

### **Maps and Summaries**
- **`GET /map/shelters`** - Show nearby shelters for donating food leftovers (**Google Maps API** integration).
- **`GET /map/transport`** - Suggest eco-friendly transportation routes and options (**Google Maps API** integration).
- **`GET /summary`** - Show a summary of all consumption data for a user.

---

## **Tech Stack**
- **Backend:** Node.js with Express.js.
- **Database:** MongoDB for storing user data and consumption statistics.
- **APIs Used:** Google Maps API for geolocation and nearby shelter suggestions.

---

## **How to Run Locally**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eco-friendly-lifestyle.git
   ```
2. Navigate to the project folder:
   ```bash
   cd eco-friendly-lifestyle
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     JWT_SECRET=your_secret_key
     ```
5. Start the server:
   ```bash
   npm start
   ```
6. Access the API at:
   - **`http://localhost:5000`**

---

