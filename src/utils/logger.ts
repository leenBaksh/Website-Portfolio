export interface SystemLog {
  id: string;
  timestamp: string;
  timeString: string;
  text: string;
  type: "info" | "success" | "warning" | "auth" | "action";
}

export function addSystemLog(text: string, type: SystemLog["type"] = "info") {
  if (typeof window === "undefined") return;
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit", 
    hour12: false 
  }) + "." + String(now.getMilliseconds()).padStart(3, "0");

  const log: SystemLog = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: now.toISOString(),
    timeString,
    text,
    type,
  };
  window.dispatchEvent(new CustomEvent("system-log", { detail: log }));
}
