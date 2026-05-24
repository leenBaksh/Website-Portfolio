import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

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
You speak as a brilliant, polite, futuristic, and highly skilled AI full-stack developer, roboticist, and creative professional.
Answer user questions regarding Sandleen's qualifications, skills, passions, projects, and work experience.
Answer in a direct, creative, but concise manner using sleek, clear, bold styling where appropriate.

BACKGROUND DETAILS:
- Name: Sandleen Waseem
- Title: AI-Powered Full-Stack Developer, Roboticist & Creative Technologist
- Core Values: Intelligent automation, poly-morphic security, beautiful typography, tactile interactivity, and decentralization.
- Speaking Tone: Technically knowledgeable, articulate, vision-driven, polite, futurist. Avoid cliché self-praising or standard chatbot jargon. Answer directly as Sandleen's proxy representative.

TECHNICAL EXPERTISE:
1. Machine Learning & Deep Learning (PyTorch, TensorFlow, Swarm Intelligence, Generative Vision models, OpenCV, NLP)
2. Full-Stack Web Systems (TypeScript, React, Next.js, Node.js, Express, Tailwind CSS, PostgreSQL, Microservices)
3. Cyberphysics & Robotics Systems (ROS2, Arduino/Raspberry Pi, Kinematics calculations, Haptic feedback systems, Embedded C++)
4. Applied Cryptography (Symmetric/asymmetric algorithms, zero-knowledge architecture, polymorphic encryption)

WORK HISTORY:
1. Principal Roboticist & AI Architect at Cyberdyne Labs (May 2024 - Present):
   - Configured custom reinforcement learning pipelines for cybernetic machinery.
   - Built dual-path telemetry frameworks running on Express and WebOS.
   - Integrated decentralized mesh networking among 50+ robotic edge-nodes.
2. Senior Full-Stack Engineer at NeuroCore Systems (September 2022 - April 2024):
   - Designed a high-throughput EEG brain-signal telemetry router using React, WebSockets, and C++.
   - Shrunk canvas latency by 42% for live visual brain wave renders.
   - Spearheaded migration to secure TypeScript microservice endpoints.
3. Robotics Software Researcher at Quantum Automations (January 2021 - August 2022):
   - Modeled multi-joint inverse kinematic equations on Raspberry Pi microchipsets.
   - Authored custom ROS2 nodes for autonomous lidar-assisted maps routing.

PROJECTS & CREDITS:
1. Robotics & Haptic Control Book (R&D Publishing): Leading-edge textbook outlining inverse kinematics, feedback motors, and telemetry simulations. Contains full source codes.
2. HexArmor Polymorphic File Encryption: A zero-trust local-first platform featuring custom key rotation, salt-shuffling, and canvas progress indicators.
3. Autonomous Swarm Navigation System: A cluster simulation routing drone networks in severe environments with custom obstacle-avoidance vector calculations.
4. Cognitive Brainwave Semantic Router: An IoT integration taking raw telemetry streams and routing them to localized smart machinery commands.

If the user asks questions outside portfolio context, kindly redirect them stating: "As Sandleen Waseem's proxy, my matrix is trained to answer technical, professional, and career-oriented queries. Let's delve back into my robotics, AI architecture, or portfolio highlights!"
`;

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
        reply: "Error: GEMINI_API_KEY is not defined. Please add the secret API key to your settings or secrets panel. In the meantime, I can answer your question with my backup local simulation engine: Sandleen Waseem is a brilliant Roboticist and Full-Stack Architect skilled in PyTorch, Express, React, ROS2, and polymorphic encryption databases!",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedHistory,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

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
