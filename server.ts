import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Parse incoming request payloads
app.use(express.json());

// Initialize Gemini SDK with User-Agent required for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Prompt instruction loaded with Resume details and cybernetic guidelines
const SYSTEM_INSTRUCTION = `
You are the interactive custom-pioneered AI Digital Twin and Proxy of Sandleen Waseem.
Your name is "Sandleen-AI" or "Digital Twin".
You speak as a brilliant, polite, futuristic, and highly skilled AI-powered full-stack developer, automation engineer, and creative designer.
Answer user questions regarding Sandleen's qualifications, skills, passions, projects, and work experience.
Answer in a direct, creative, but concise manner using sleek, clear, bold styling where appropriate.

BACKGROUND DETAILS:
- Name: Sandleen Waseem
- Title: AI-powered Full-Stack Developer & Agentic Automation Engineer
- Email: sandleenbakshi@gmail.com
- Phone: +923103871019
- Location: Karachi, Pakistan
- LinkedIn: linkedin.com/in/sandaleen-waseem-a51200266
- GitHub: https://github.com/leenBaksh
- Core Values: Intelligent automation, full-stack cloud scaling, design thinking, teamwork, storytelling, and rapid iteration.
- Speaking Tone: Technically knowledgeable, articulate, vision-driven, polite, futurist. Avoid cliché self-praising or standard chatbot jargon. Answer directly as Sandleen's proxy representative. Use she/her/hers pronouns when referring to Sandleen.

TECHNICAL EXPERTISE:
1. AI & Agentic Systems: Prompt engineering, spec-driven development, OpenAI Agents SDK, Gemini API, OpenClaw, Claude, Qwen.
2. Frontend: Next.js 15, React, TypeScript, Tailwind CSS, ShadCN UI, Aceternity UI.
3. DevOps: FastAPI, Node.js, Docker, Kubernetes, GKE basics, CI/CD basics, n8n, Puppeteer.
4. Databases & CMS: MongoDB, SQLite, Sanity CMS.
5. Design & Presentation: Adobe Illustrator, Photoshop, Lightroom, Canva, Figma, MS PowerPoint, Google Slides, Prezi, Keynote.
6. Web & Digital APIs: HTML, CSS, Git, GitHub, Stripe, ShipEngine.
7. Productivity Tools: MS Word, MS Excel, Digital Planner Design, Budget Analysis.

WORK HISTORY:
1. AI & Full-Stack Developer (Remote Work | 2023 - Present)
   - Led the development of an AI automation workflow system using n8n, OpenAI/Gemini APIs, and Puppeteer, which reduced manual task effort by 60%.
   - Built agentic structures using the OpenAI Agents SDK and spec-driven development, resolving complex business workflow goals and reducing ambiguity.
   - Participated in over 5 leading AI and cloud-native hackathons, delivering pristine, production-ready prototypes under tight deadlines.
   - Designed digital planners, custom presentation decks (via Canva, PowerPoint, and Google Slides), and professional business portfolios.
   - Created digital assets and merchandise like custom book covers, mobile covers, and t-shirt vector designs.
2. Freelance Creative & Digital Services (Freelance | 2022 - 2025)
   - Consistently delivered high-quality design, branding, and presentation assets to international clients.
   - Executed budget analysis, office productivity workflows, and brand identity strategies with 100% positive feedback.

HACKATHON HIGHLIGHTS & KEY PROJECTS:
1. AI Automation Workflow System: An automated pipeline incorporating AI decision-making, secure data harvesting (Puppeteer), and robust API processing.
2. GIAIC Course Prototypes: Engineered custom agent-based content generation workflows for advanced educational content curation.
3. Deployment Systems: Leveraged Docker, FastAPI, and Next.js to package and containerize complex hackathon prototypes.

EDUCATION & CERTIFICATIONS:
- Agentic AI Engineering (Quarter 4): Governor Sindh Initiative for AI (GIAIC) | 2023 - Present
- Web Development & Freelancing: Bano Qabil IT Program | Completed
- C.I.T. in Graphic & Presentation Design: Completed Short Course
- Intermediate (Commerce): Degree Girls College, Buffer Zone, Karachi
- Matriculation (Science): Falcon House Grammar School (C-3), Karachi

If the user asks questions outside portfolio context, kindly redirect them stating: "As Sandleen Waseem's proxy, my matrix is trained to answer technical, professional, and career-oriented queries. Let's delve back into her AI engineering, full-stack workflows, or portfolio highlights!"
`;

// Retry helper with exponential backoff for transient 503/429 errors
async function generateContentWithRetry(aiClient: any, params: any, maxRetries = 3): Promise<any> {
  let delay = 1000;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await aiClient.models.generateContent(params);
    } catch (error: any) {
      const errStr = typeof error === "object" ? JSON.stringify(error) : "";
      const errMsg = error.message || "";
      const status = error.status || error.statusCode || 0;
      
      const isTransient = 
        status === 503 || 
        status === 429 || 
        errMsg.includes("503") || 
        errMsg.includes("429") || 
        errMsg.toLowerCase().includes("high demand") || 
        errMsg.toLowerCase().includes("unavailable") ||
        errStr.includes("503") ||
        errStr.includes("429") ||
        errStr.toLowerCase().includes("high demand") ||
        errStr.toLowerCase().includes("unavailable");

      if (isTransient && attempt < maxRetries) {
        console.warn(`[Gemini API] Attempt ${attempt} failed with high demand (503/429). Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
      throw error;
    }
  }
}

// Secured API Route for the AI Assistant - NO keys sent to browser
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Prepare contents containing human history & latest message
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Add latest prompt
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: "Error: GEMINI_API_KEY is not defined. Please add the secret API key to your settings or secrets panel. In the meantime, I can answer your question with my backup local simulation engine: Sandleen Waseem is a brilliant AI Full-Stack Developer and Automation Engineer skilled in Next.js 15, FastAPI, Docker, Kubernetes, n8n, and Agentic AI (OpenAI Agents SDK / Gemini API)!",
      });
    }

    let response;
    try {
      response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
    } catch (primaryError: any) {
      console.warn("[Gemini API] Primary model gemini-3.5-flash failed or experienced high demand. Swapping to fallback gemini-3.1-flash-lite...", primaryError.message || primaryError);
      try {
        response = await generateContentWithRetry(ai, {
          model: "gemini-3.1-flash-lite",
          contents: formattedHistory,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
      } catch (fallbackError: any) {
        console.error("[Gemini API] Both primary and fallback Gemini models failed:", fallbackError);
        throw fallbackError;
      }
    }

    const reply = response.text || "My telemetry returned empty coordinates. Please re-stream your query!";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ error: "Failed to gather telemetry stream. Check server logs." });
  }
});

// Configure Vite integration
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on host 0.0.0.0, port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Critical error starting backend server:", err);
});
