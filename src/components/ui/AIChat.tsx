"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Hello! I am Gurnoor's AI assistant. Ask me anything about his skills, education, or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply || data.error || "Sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Communication error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format AI text to handle basic markdown like **bold** and * lists
  const formatMessage = (text: string) => {
    if (!text) return { __html: "" };
    let formatted = text
      // Replace **text** with <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Replace * list items with •
      .replace(/(?:^|\n)\* (.*)/g, '<br/>• $1')
      // Replace single * with bullet
      .replace(/(?:^|\n)\- (.*)/g, '<br/>• $1')
      // Replace newlines with <br/>
      .replace(/\n/g, '<br/>');
    
    return { __html: formatted };
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 p-4 rounded-full bg-cosmic-blue hover:bg-cosmic-blue/80 text-white shadow-[0_0_20px_rgba(30,144,255,0.4)] transition-all z-40 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-6 w-[90vw] sm:w-[400px] h-[600px] max-h-[85vh] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl flex flex-col z-50 shadow-[0_0_50px_rgba(59,130,246,0.1)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cosmic-blue/20 to-transparent p-4 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <h3 className="font-bold text-white">Ask Gurnoor's AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area - Added data-lenis-prevent to allow natural scrolling */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth custom-scrollbar" data-lenis-prevent>
              {messages.map((msg, i) => (
                <div key={i} className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-md ${msg.role === 'user' ? 'bg-cosmic-blue text-white self-end rounded-tr-sm' : 'bg-white/5 text-slate-200 self-start rounded-tl-sm border border-white/5'}`}>
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <div dangerouslySetInnerHTML={formatMessage(msg.content)} />
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white/5 text-slate-200 self-start rounded-2xl p-4 rounded-tl-sm animate-pulse border border-white/5 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                  </span>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-white/5 bg-black/50 flex gap-3 items-end">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }}
                placeholder="Ask something..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cosmic-blue resize-none min-h-[48px] max-h-[120px] text-sm"
                rows={1}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 bg-cosmic-blue rounded-xl text-white hover:bg-cosmic-blue/80 transition-colors disabled:opacity-50 disabled:hover:bg-cosmic-blue"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
