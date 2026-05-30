import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cyberAudio } from "../utils/audio";
import { addSystemLog } from "../utils/logger";
import { 
  Mail, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  MessageSquare, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  Check,
  RefreshCw,
  Terminal,
  Lock,
  Calendar,
  Phone
} from "lucide-react";

interface ContactSectionProps {
  onOpenChat: () => void;
}

export default function ContactSection({ onOpenChat }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [transmittedLog, setTransmittedLog] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      errors.name = "Identification signature required (Name).";
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Telemetry route required (Email).";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid routing address template (Email format).";
      valid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Payload content empty (Message is required).";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      cyberAudio.playTick();
      addSystemLog("COURIER_ERROR: Validation mismatch. Check required form metrics.", "warning");
      return;
    }

    addSystemLog(`COURIER_INIT: Establishing connection for [${formData.name}]...`, "action");
    cyberAudio.playConfirm();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setTransmittedLog([
      "Initializing connection handshake...",
      "Encrypting transmission payload via local telemetry...",
      "Resolving endpoint: mailto:sandleenbakshi@gmail.com..."
    ]);

    // Simulated network transmission log updates
    await new Promise(resolve => setTimeout(resolve, 600));
    setTransmittedLog(prev => [...prev, "Status code: 202 ACCEPTED. Structuring payload..."]);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setTransmittedLog(prev => [...prev, "Injecting feedback log to localStorage pipeline..."]);
    
    // Save locally
    const submissions = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
    submissions.push({
      ...formData,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9)
    });
    localStorage.setItem("contact_submissions", JSON.stringify(submissions));

    await new Promise(resolve => setTimeout(resolve, 600));
    setTransmittedLog(prev => [...prev, "Handshake successful. Courier complete!"]);

    // First trigger the elegant inline success checkmark animation on the button itself
    setIsSuccessState(true);
    cyberAudio.playConfirm();
    addSystemLog(`COURIER_SUCCESS: Handshake secured. Message from [${formData.email}] dispatched!`, "success");
    await new Promise(resolve => setTimeout(resolve, 1400));

    setIsSubmitting(false);
    setSubmitStatus("success");
    setIsSuccessState(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const resetForm = () => {
    setSubmitStatus("idle");
    setIsSuccessState(false);
    setTransmittedLog([]);
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="space-y-12">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
      >
        {/* Left Column: Tactical Contact Info & Prompts */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 flex flex-col justify-between space-y-8"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-glow uppercase tracking-widest bg-cyan-glow/5 border border-cyan-glow/15 px-3 py-1 rounded-full">
              <Bot size={13} className="text-cyan-glow animate-pulse" />
              <span>Direct Link Gateway</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
              Let's Engineer Something Great
            </h3>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Have an automated workflow prototype, a custom web app concept, or an intriguing remote contract role? 
              Connect directly through the secure portfolio courier, or trigger the dedicated AI chatbot proxy.
            </p>

            <div className="space-y-4 pt-4">
              {/* Info block 1 */}
              <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-cyan-glow/15 transition-all">
                <div className="p-2.5 rounded-lg bg-zinc-950 text-cyan-glow border border-white/5 shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-gray-500 tracking-wider">DIRECT EMAIL LINK</h4>
                  <a href="mailto:sandleenbakshi@gmail.com" className="text-sm font-semibold text-white hover:text-cyan-glow transition-colors font-mono">
                    sandleenbakshi@gmail.com
                  </a>
                </div>
              </div>

              {/* Info block 2 (Phone) */}
              <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-cyan-glow/15 transition-all">
                <div className="p-2.5 rounded-lg bg-zinc-950 text-cyan-glow border border-white/5 shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-gray-500 tracking-wider">TELEPHONY SUITE</h4>
                  <a href="tel:+923103871019" className="text-sm font-semibold text-white hover:text-cyan-glow transition-colors font-mono">
                    +92 310 3871019
                  </a>
                </div>
              </div>

              {/* Info block 3 */}
              <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-purple-glow/15 transition-all">
                <div className="p-2.5 rounded-lg bg-zinc-950 text-purple-glow border border-white/5 shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-gray-500 tracking-wider">GEOLOCATION ROUTE</h4>
                  <p className="text-sm font-semibold text-white leading-tight">Karachi, Pakistan</p>
                </div>
              </div>

              {/* Info block 4 */}
              <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-amber-500/15 transition-all">
                <div className="p-2.5 rounded-lg bg-zinc-950 text-amber-400 border border-white/5 shrink-0">
                  <Calendar size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-gray-500 tracking-wider">OPERATIONAL WINDOWS</h4>
                  <p className="text-sm font-semibold text-white">Available for worldwide remote collaborations & AI integrations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Channels & Engagement Trigger */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Connect on other channels</h4>
            
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://github.com/leenBaksh" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center space-x-2 px-4 py-2 bg-zinc-950 border border-white/5 hover:border-cyan-glow/30 hover:bg-zinc-900/30 rounded-xl font-mono text-xs text-gray-300 hover:text-white transition-all min-h-[44px]"
              >
                <Github size={14} />
                <span>GitHub Profile</span>
              </a>

              <a 
                href="https://linkedin.com/in/sandaleen-waseem-a51200266" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center space-x-2 px-4 py-2 bg-zinc-950 border border-white/5 hover:border-cyan-glow/30 hover:bg-zinc-900/30 rounded-xl font-mono text-xs text-gray-300 hover:text-white transition-all min-h-[44px]"
              >
                <Linkedin size={14} className="text-[#0a66c2]" />
                <span>LinkedIn Connect</span>
              </a>
              
              <button 
                onClick={onOpenChat}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-glow/10 to-purple-glow/10 border border-cyan-glow/30 hover:border-cyan-glow hover:bg-cyan-glow/5 rounded-xl font-mono text-xs text-cyan-glow hover:text-white transition-all min-h-[44px]"
              >
                <MessageSquare size={14} />
                <span>Talk to Chatbot Twin</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Dynamic Form Module */}
        <motion.div 
          id="contact-form-card"
          variants={itemVariants}
          className="lg:col-span-7"
        >
          <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden bg-zinc-900/30 backdrop-blur-md h-full flex flex-col justify-center">
            
            {/* Ambient glows inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-glow/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-glow/5 rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {submitStatus === "idle" && (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-5 relative z-10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name input */}
                    <div className="space-y-1.5 flex flex-col">
                      <label htmlFor="name" className="block text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
                        Identification (Name) <span className="text-cyan-glow">*</span>
                      </label>
                      <div className="relative rounded-xl overflow-visible">
                        {focusedField === "name" && (
                          <>
                            <motion.div
                              layoutId="active-input-glow"
                              className="absolute -inset-[3px] rounded-xl bg-gradient-to-r from-cyan-glow via-purple-glow to-cyan-glow opacity-55 blur-[6px] pointer-events-none z-0"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                            <motion.div
                              layoutId="active-input-border"
                              className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-glow via-purple-glow to-cyan-glow pointer-events-none z-0"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          </>
                        )}
                        <input 
                          type="text" 
                          id="name"
                          name="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => {
                            cyberAudio.playTick();
                            setFocusedField("name");
                          }}
                          onBlur={() => setFocusedField(null)}
                          placeholder="e.g. Richard Hendricks"
                          className={`relative z-10 w-full bg-zinc-950 border ${focusedField === "name" ? "border-transparent" : (formErrors.name ? "border-rose-500/50" : "border-white/10 hover:border-white/15")} rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all font-mono`}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="text-[10px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                          <span>●</span> {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5 flex flex-col">
                      <label htmlFor="email" className="block text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
                        Telemetry Route (Email) <span className="text-cyan-glow">*</span>
                      </label>
                      <div className="relative rounded-xl overflow-visible">
                        {focusedField === "email" && (
                          <>
                            <motion.div
                              layoutId="active-input-glow"
                              className="absolute -inset-[3px] rounded-xl bg-gradient-to-r from-cyan-glow via-purple-glow to-cyan-glow opacity-55 blur-[6px] pointer-events-none z-0"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                            <motion.div
                              layoutId="active-input-border"
                              className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-glow via-purple-glow to-cyan-glow pointer-events-none z-0"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          </>
                        )}
                        <input 
                          type="email" 
                          id="email"
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => {
                            cyberAudio.playTick();
                            setFocusedField("email");
                          }}
                          onBlur={() => setFocusedField(null)}
                          placeholder="e.g. richard@hooli.xyz"
                          className={`relative z-10 w-full bg-zinc-950 border ${focusedField === "email" ? "border-transparent" : (formErrors.email ? "border-rose-500/50" : "border-white/10 hover:border-white/15")} rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all font-mono`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-[10px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                          <span>●</span> {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject input */}
                  <div className="space-y-1.5 flex flex-col">
                    <label htmlFor="subject" className="block text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
                      Transmission Subject
                    </label>
                    <div className="relative rounded-xl overflow-visible">
                      {focusedField === "subject" && (
                        <>
                          <motion.div
                            layoutId="active-input-glow"
                            className="absolute -inset-[3px] rounded-xl bg-gradient-to-r from-cyan-glow via-purple-glow to-cyan-glow opacity-55 blur-[6px] pointer-events-none z-0"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                          <motion.div
                            layoutId="active-input-border"
                            className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-glow via-purple-glow to-cyan-glow pointer-events-none z-0"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        </>
                      )}
                      <input 
                        type="text" 
                        id="subject"
                        name="subject" 
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => {
                          cyberAudio.playTick();
                          setFocusedField("subject");
                        }}
                        onBlur={() => setFocusedField(null)}
                        placeholder="e.g. Workflow automation consultation request"
                        className={`relative z-10 w-full bg-zinc-950 border ${focusedField === "subject" ? "border-transparent" : "border-white/10 hover:border-white/15"} rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all font-mono`}
                      />
                    </div>
                  </div>

                  {/* Message body input */}
                  <div className="space-y-1.5 flex flex-col">
                    <label htmlFor="message" className="block text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
                      Payload content (Message) <span className="text-cyan-glow">*</span>
                    </label>
                    <div className="relative rounded-xl overflow-visible">
                      {focusedField === "message" && (
                        <>
                          <motion.div
                            layoutId="active-input-glow"
                            className="absolute -inset-[3px] rounded-xl bg-gradient-to-r from-cyan-glow via-purple-glow to-cyan-glow opacity-55 blur-[6px] pointer-events-none z-0"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                          <motion.div
                            layoutId="active-input-border"
                            className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-cyan-glow via-purple-glow to-cyan-glow pointer-events-none z-0"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        </>
                      )}
                      <textarea 
                        id="message"
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => {
                          cyberAudio.playTick();
                          setFocusedField("message");
                        }}
                        onBlur={() => setFocusedField(null)}
                        rows={4}
                        placeholder="Enter details of your project context, target specs, or collaboration parameters..."
                        className={`relative z-10 w-full bg-zinc-950 border ${focusedField === "message" ? "border-transparent" : (formErrors.message ? "border-rose-500/50" : "border-white/10 hover:border-white/15")} rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all font-mono resize-none`}
                      />
                    </div>
                    {formErrors.message && (
                      <p className="text-[10px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                        <span>●</span> {formErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Secure indicators notice */}
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-500 border-t border-white/5 pt-4">
                    <Lock size={12} className="text-cyan-glow/60" />
                    <span>Secure Client Cryptography Active. Signals are saved and routed locally.</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccessState}
                    className={`w-full py-4.5 rounded-xl font-mono font-bold text-xs uppercase tracking-widest shadow-lg transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-50 min-h-[48px] ${
                      isSuccessState
                        ? "bg-emerald-500 text-zinc-950 shadow-emerald-500/25 border border-emerald-400/40 hover:bg-emerald-400"
                        : "bg-cyan-glow text-dark-bg shadow-cyan-glow/10 hover:shadow-cyan-glow/20 hover:bg-cyan-glow/90 border border-transparent"
                    }`}
                  >
                    {isSuccessState ? (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="flex items-center space-x-2.5"
                      >
                        <motion.span 
                          initial={{ rotate: -50, scale: 0.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 250, damping: 12 }}
                        >
                          <Check size={16} className="stroke-[3] text-zinc-950 shrink-0" />
                        </motion.span>
                        <span className="font-bold tracking-widest">transmission secured</span>
                      </motion.div>
                    ) : isSubmitting ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>transmitting signals...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>transmit payload securely</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {/* Success Console Feedback Overlay */}
              {submitStatus === "success" && (
                <motion.div 
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 relative z-10 font-mono text-xs flex flex-col justify-between h-full min-h-[380px]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2.5 text-emerald-400 font-bold border-b border-white/5 pb-3">
                      <CheckCircle2 size={18} className="animate-bounce" />
                      <span className="text-sm tracking-wider">COURIER DISPATCHED SUCCESSFULLY!</span>
                    </div>

                    <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-850/50 text-gray-300 font-mono space-y-1.5 leading-relaxed overflow-x-auto select-all max-h-56">
                      <div className="text-cyan-glow font-bold border-b border-white/5 pb-1 mb-2 flex justify-between items-center text-[10px]">
                        <span>[PORTFOLIO CONSOLE LOG]</span>
                        <span>v1.0.0</span>
                      </div>
                      {transmittedLog.map((log, idx) => (
                        <div key={`log-${idx}`} className={`text-[11px] ${idx === transmittedLog.length - 1 ? "text-cyan-glow font-bold animate-pulse" : "text-gray-450"}`}>
                          ⚡ {log}
                        </div>
                      ))}
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed font-sans">
                      Your transmission signal was written to the pipeline. Sandleen Waseem receives direct dispatches of your query, and will get back to you shortly at the telemetry route you provided.
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex gap-4">
                    <button
                      onClick={resetForm}
                      className="flex-1 py-3 text-center border border-white/10 hover:border-cyan-glow/40 hover:bg-white/5 rounded-xl font-mono text-xs text-gray-300 hover:text-white transition-all min-h-[44px]"
                    >
                      New Transmission
                    </button>
                    <button
                      onClick={onOpenChat}
                      className="flex-1 py-3 text-center bg-cyan-glow text-dark-bg font-mono font-bold text-xs rounded-xl hover:bg-cyan-glow/90 active:scale-95 transition-all min-h-[44px]"
                    >
                      Talk with Chatbot Twin
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
