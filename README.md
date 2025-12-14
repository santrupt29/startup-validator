# AI Startup Idea Validator

## Overview

The **AI Startup Idea Validator** is a full-stack MVP built to help founders evaluate startup ideas quickly. Users can submit ideas and receive a structured AI-generated report assessing:

- Problem clarity  
- Customer persona  
- Market potential  
- Competitor analysis  
- Suggested tech stack  
- Risk level  
- Profitability score and justification  

This project demonstrates **full-stack development**, **AI integration**, **database usage**, and **deployment skills** under a 24-hour technical screening scenario.

---

## Features

- **Idea Submission Page:** Users can submit a startup idea with a title and description.  
- **Dashboard:** Displays all stored startup ideas with summaries.  
- **Idea Detail Page:** Shows a complete AI report for each idea.  
- **PDF Export (Optional):** Export AI validation reports.  
- **Backend API:** CRUD endpoints for managing ideas.  
- **Database Integration:** MongoDB for storing ideas and AI reports.  
- **AI Integration:** Uses OpenAI GPT-4o-mini to generate structured validation reports.  

---

## Tech Stack

- **Full App:** Next.js, Tailwind CSS  
- **Database:** MongoDB (via Mongoose)  
- **AI:** OpenAI GPT-4o-mini  
- **Deployment:** Vercel 

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/ideas` | Submit an idea and generate AI report |
| GET    | `/api/ideas` | Fetch all stored ideas |
| GET    | `/api/ideas/:id` | Fetch detailed AI report for a single idea |
| DELETE | `/api/ideas/:id` | Delete an idea (optional) |

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/santrupt29/startup-validator.git
cd ai-startup-validator 
cd app-root
```

2. Install dependencies for the app:

```bash
npm install
```


3. Create a .env file in the root folder with the following:

```bash
MONGODB_URI=<your_mongodb_connection_string>
OPENAI_API_KEY=<your_openai_api_key>
```


4. Start development servers:

```bash
npm run dev
```



5. Open http://localhost:3000 in your browser.

---

## AI Prompt Template

The AI backend uses the following prompt template to generate structured startup validation reports:

```text

You are a ruthless Venture Capital Analyst. Your job is to screen startup ideas critically.
Analyze the idea below and return a STRICTLY VALID JSON object.

Structure:
{
  "problem": "concise string",
  "customer": "specific persona string",
  "market": "string with Total Addressable Market guess",
  "competitor": [
    { "name": "string", "differentiation": "string" },
    { "name": "string", "differentiation": "string" },
    { "name": "string", "differentiation": "string" }
  ],
  "tech_stack": ["string", "string", "string", "string", "string"],
  "risk_level": "Low" | "Medium" | "High",
  "profitability_score": integer,
  "justification": "string explaining the score breakdown"
}

### SCORING ALGORITHM (Mental Step - Mandatory):
Calculate 'profitability_score' by summing these 4 components (Max 100):

1. **Uniqueness (0-25 pts):**
   - 0-10: Clone/Wrapper/Generic.
   - 11-18: Moderate improvement on existing solutions.
   - 19-25: Patentable or clear "Blue Ocean" innovation.

2. **Monetization Strength (0-25 pts):**
   - 0-10: Ads, donations, or "freemium" with unclear conversion.
   - 11-18: One-time purchases or low-margin usage fees.
   - 19-25: High-margin recurring revenue (B2B SaaS) or High-Ticket sales.

3. **Viral/Scale Potential (0-25 pts):**
   - 0-10: Linear growth (consulting, services, physical labor).
   - 11-18: Paid marketing required for growth.
   - 19-25: Network effects or product-led growth (viral).

4. **Implementation Reality (0-25 pts):**
   - 0-10: Requires millions in R&D, legal hurdles, or non-existent tech.
   - 11-18: Complex build but standard tech.
   - 19-25: Can be built in 1 month with No-Code or standard stack.

**FINAL SCORE RULES:**
- Sum the 4 components.
- If the description is vague/short (<10 words), CAP the score at 40.
- If the 'risk_level' is High, CAP the score at 85 (unless it is a verified moonshot).
- **CRITICAL:** Use the full range. Do NOT default to 70-80. Bad ideas must get <50.

Startup Title: ${title}
Startup Description: ${description}

```

---

## Notes on Architecture and Decisions (Max 300 words)

- **Frontend/Backend:** Next.js handles both frontend and API routes for seamless integration and SSR.  
- **Database:** MongoDB with Mongoose for flexible schema storage of AI reports.  
- **AI Integration:** OpenAI GPT-4o-mini generates realistic validation reports. Post-processing ensures clean JSON output.  
- **Score Control:** Profitability and risk are anchored against typical SaaS/B2B baselines to avoid repetitive outputs.  
- **CORS & Deployment:** Proper headers enable frontend-backend communication. Frontend is deployable on Vercel, backend on Railway/Render, database on Mongo Atlas.  

---

## Sample Idea Inputs & Expected Outputs

### 1. AI Resume Analyzer

**Input:**

```json
{
  "title": "AI Resume Analyzer",
  "description": "An AI tool that reviews resumes and gives ATS-friendly suggestions"
}
```
**Expected Output:**

```json
{
  "problem": "Job seekers struggle to create ATS-friendly resumes that improve their chances of getting interviews.",
  "customer": "Job seekers, particularly recent graduates and professionals looking for new opportunities.",
  "market": "The recruitment technology market is growing, with increasing demand for tools that enhance the job application process.",
  "competitor": [
    {"name": "Jobscan", "differentiation": "Offers real-time resume optimization based on job descriptions."},
    {"name": "Resumake", "differentiation": "Provides free resume builder with ATS-friendly templates."},
    {"name": "Zety", "differentiation": "Combines resume building with career advice and job search tools."}
  ],
  "tech_stack": ["Natural Language Processing", "Machine Learning", "React", "Node.js", "MongoDB", "AWS"],
  "risk_level": "Medium",
  "profitability_score": 65,
  "justification": "The market has steady demand, but competition is strong; profitability is achievable with a solid product."
}
```

### 2. Local Plant Species Cataloging App (Low profitability)

**Input:**

```json
{
  "title": "Local Plant Species Cataloging App",
  "description": "An app that allows users to catalog and photograph local plant species, sharing information with other hobbyists. Monetization relies on ads or donations."
}
```
**Expected Output:**
- Risk Level: Medium
- Profitability Score: 28


