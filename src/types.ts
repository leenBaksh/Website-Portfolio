export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  specs: { label: string; value: string }[];
}

export interface ExperienceEvent {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  category: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp: string;
}

export interface QuickPrompt {
  id: string;
  label: string;
  prompt: string;
}
