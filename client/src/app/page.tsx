'use client'

import { generateContent } from "@/api/api";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Trash2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateContent(input);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: response.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating content:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-zinc-950 text-zinc-100 selection:bg-purple-500/30">
      {/* Header */}
      <header className="glass-dark sticky top-0 z-10 flex items-center justify-between border-b border-white/5 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">AI Assistant</h1>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="group flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:bg-white/5"
          title="Clear Chat"
        >
          <Trash2 className="h-5 w-5 text-zinc-400 group-hover:text-red-400 transition-colors" />
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-8 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center space-y-4 py-20 text-center"
              >
                <div className="rounded-full bg-white/5 p-6 ring-1 ring-white/10">
                  <Bot className="h-12 w-12 text-zinc-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">How can I help you today?</h2>
                  <p className="mt-2 text-zinc-400">Start a conversation with your unique assistant.</p>
                </div>
              </motion.div>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${msg.role === 'user' ? 'bg-purple-600' : 'bg-zinc-800 ring-1 ring-white/10'
                      }`}>
                      {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </div>
                    <div className={`space-y-1.5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm prose prose-invert max-w-none ${msg.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'glass-dark border border-white/5 text-zinc-200'
                        }`}>
                        {msg.role === 'user' ? (
                          msg.text
                        ) : (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-base font-bold mb-1">{children}</h3>,
                              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                              code: ({ children }) => <code className="bg-white/10 rounded px-1 py-0.5 font-mono text-xs">{children}</code>,
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500 font-medium px-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 ring-1 ring-white/10">
                    <Bot className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="glass-dark flex items-center gap-1.5 rounded-2xl px-5 py-3 border border-white/5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:0.4s]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-white/5 bg-zinc-950/50 p-4 md:p-6 backdrop-blur-xl">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-3xl relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full rounded-2xl bg-zinc-900 border border-white/5 px-5 py-4 pr-14 text-zinc-100 transition-all focus:border-purple-500/50 focus:outline-none focus:ring-4 focus:ring-purple-500/10 placeholder:text-zinc-500 shadow-xl"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center rounded-xl bg-purple-600 text-white transition-all hover:bg-purple-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600 shadow-lg shadow-purple-500/20"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <p className="mt-3 text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
          Powered by Gemini AI
        </p>
      </footer>
    </div>
  );
}
