---
title: Sandleen Waseem Portfolio
emoji: 💻
colorFrom: cyan
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
license: mit
---

# Sandleen Waseem - Interactive AI Portfolio Hub

An ultra-modern, high-performance interactive 3D engineering portfolio showcasing **Agentic AI systems, automated developer workflows, and full-stack cloud applications**. Equipped with a custom-engineered **AI Digital Twin chatbot** backed by the Gemini Pro framework, designed to converse with recruiters and collaborators dynamically.

## 🚀 Hugging Face Space Quick Start

This space is pre-configured to build, run, and host instantly on **Hugging Face Spaces** using the integrated `Dockerfile`.

### 1. Requirements & Setup
The port binds dynamically based on Hugging Face's internal proxy config (targeting port `7860`).

### 2. Add Secrets
To activate the interactive AI Chat proxy (Sandleen's digital twin), make sure to configure your API keys in the **Hugging Face Space Settings**:
* Go to your Space **Settings** page.
* Add a new **Variables and secrets** entry:
  * **Secret Key**: `GEMINI_API_KEY`
  * **Value**: *[Your personal Google Gemini API Key]*

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Local
Create a `.env` file at the root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build and Run Production
```bash
npm run build
npm run start
```
