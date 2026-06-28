# Fitness.AI — Intelligent Fitness Backend Service

A production-grade AI-powered backend that transforms raw workout data into personalized coaching insights using Google Gemini Pro and a scalable Spring Boot microservices architecture.

---

## Overview

Fitness.AI goes beyond generic fitness tracking. It analyzes physiological metrics in real time and delivers context-aware, human-like coaching feedback — helping users train smarter, recover better, and avoid overexertion.

---

## Key Features

**Cognitive Activity Analysis**
Provides context-aware feedback on pace, intensity, and recovery patterns — not just basic charts.

**Intelligent Recommendations**
Dynamically generates the next best workout based on the user's current performance and fatigue levels using Gemini 1.5 Flash LLM.

**Proactive Safety Engine**
Detects potential overexertion by analyzing heart rate zones and suggests immediate corrective measures.

**Automated Data Structuring**
Converts unstructured AI text responses into strictly typed JSON objects for seamless frontend consumption using Jackson.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Spring Boot 3.x | RESTful API management |
| AI Engine | Google Gemini 1.5 Flash | LLM for fitness reasoning |
| Processing | Jackson (JSON) | AI text to Java object mapping |
| Automation | Project Lombok | Boilerplate reduction |

---

## Architecture

```
User Request
     |
     v
Spring Boot REST API
     |
     v
Gemini 1.5 Flash (LLM)
     |
     v
Jackson JSON Parser
     |
     v
Typed Java Response Object
     |
     v
Client
```

---

## Getting Started

### Prerequisites

- JDK 17 or higher
- Maven 3.6+
- Google AI Studio API Key — [Get it here](https://aistudio.google.com/)

### Configuration

Update `src/main/resources/application.properties`:

```properties
# Gemini API Configuration
gemini.api.key=YOUR_API_KEY_HERE
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

### Run the Application

```bash
mvn clean install
mvn spring-boot:run
```

---

## API Reference

### Analyze Workout and Get Recommendations

**Endpoint**
```
POST /api/recommendations
```

**Request Body**
```json
{
  "type": "Trail Running",
  "duration": 50,
  "caloriesBurned": 620,
  "additionalMetrics": "Elev. Gain: 300m, Avg HR: 162bpm"
}
```

**Response**
```json
{
  "analysis": "Excellent endurance shown during the elevation gain...",
  "improvements": ["Work on downhill pace to conserve energy"],
  "suggestions": ["Active recovery walk for 20 minutes"],
  "safetyNotes": ["High HR detected at minute 40; watch your zones"]
}
```

---

## Roadmap

- [x] Integration with Google Gemini AI
- [x] Automated JSON parsing logic
- [ ] Support for multi-activity historical trends
- [ ] Integration with Wearable Device SDKs (Apple Health / Google Fit)
- [ ] Swagger / OpenAPI documentation

---

## Contributing

Contributions are welcome and appreciated.

1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m "Add AmazingFeature"
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

---

## Author

**Sunny Sharma**
Java Backend Developer | Spring Boot | Microservices | Gemini API

- GitHub: [github.com/sunnysharma93](https://github.com/sunnysharma93)
- LinkedIn: [linkedin.com/in/sunny-sharma9310](https://linkedin.com/in/sunny-sharma9310)
- Email: sunnysharma.org1@gmail.com
