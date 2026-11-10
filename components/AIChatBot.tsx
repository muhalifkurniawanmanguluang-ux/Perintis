import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  ChevronDown, 
  Loader2, 
  Ship 
} from 'lucide-react';

interface AIChatBotProps {
  lang: 'ID' | 'EN';
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested quick prompts/questions
  const quickQuestions = lang === 'ID' ? [
    { text: "Keagenan Kapal", query: "Apa saja layanan Keagenan Kapal (Port Agency) yang disediakan?" },
    { text: "Bongkar Muat (PBM)", query: "Bagaimana layanan bongkar muat (PBM / Stevedoring) untuk kargo?" }
  ] : [
    { text: "Port Agency", query: "What ship agency services do you provide?" },
    { text: "Cargo Handling (PBM)", query: "What stevedoring and PBM cargo services are available?" }
  ];

  // Set initial welcome greeting on component mount or language change
  useEffect(() => {
    const greeting = lang === 'ID' 
      ? "Halo! Selamat datang di PT Perintis Bermuda Perkasa. Saya PBP Chat Assistant, siap membantu memberikan informasi detail mengenai layanan Keagenan Kapal (Shipping Agency) serta Jasa Bongkar Muat Kargo (PBM / Stevedoring). Ada yang bisa saya bantu hari ini?"
      : "Hello! Welcome to PT Perintis Bermuda Perkasa. This is PBP Chat Assistant. I am here to provide you with comprehensive information on our Port & Shipping Agency and Cargo Handling (PBM / Stevedoring) services. How can I assist you today?";
    
    setMessages([
      { role: 'assistant', content: greeting }
    ]);
  }, [lang]);

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMsg];
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch AI reply.");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (err: any) {
      console.error(err);
      const fallbackText = lang === 'ID'
        ? "Mohon maaf, terjadi gangguan koneksi ke server asisten kami. Silakan hubungi langsung tim operasional kami di sales@perintisbermudaperkasa.com atau klik tombol WhatsApp di samping."
        : "We apologize, but there was an issue communicating with our chat helper. Please reach out directly via sales@perintisbermudaperkasa.com or tap the WhatsApp button.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackText }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* FLOATING ACTION CONTAINER (BOTTOM RIGHT OF SCREEN) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5 pointer-events-none">
        
        {/* AI CHATBOT MAIN FLOATING ACTION */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="pointer-events-auto w-12 h-12 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center border border-zinc-800 shadow-xl relative group"
            >
              <MessageSquare size={20} className="relative z-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* CHAT WINDOW (Floating Card) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.92 }}
              transition={{ type: 'spring', damping: 24 }}
              className="pointer-events-auto w-[92vw] sm:w-[410px] h-[550px] max-h-[85vh] bg-white dark:bg-zinc-950 border border-brand-100 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
            >
              {/* HEADER CONTAINER */}
              <div className="bg-[#041d2a] p-4 text-white flex justify-between items-center relative">
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-cyan-950 border border-brand-300/20 flex items-center justify-center text-brand-300 relative">
                    <Bot size={20} className="text-cyan-400" />
                    <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-zinc-950"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight tracking-wider">
                      PBP Support AI
                    </h3>
                    <span className="text-[10px] text-zinc-400 leading-none block mt-0.5">Online • Instantly available</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 relative z-10">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 px-2 rounded-xl text-brand-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronDown size={20} />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 px-2 rounded-xl text-brand-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* MESSAGES VIEWLINE */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 dark:bg-zinc-950/40">
                {messages.map((msg, index) => {
                  const isAssistant = msg.role === 'assistant';
                  return (
                    <div 
                      key={index} 
                      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} items-end gap-2.5`}
                    >
                      {isAssistant && (
                        <div className="w-8 h-8 rounded-full bg-cyan-900 border border-brand-800/40 flex items-center justify-center shrink-0">
                          <Bot size={15} className="text-cyan-400" />
                        </div>
                      )}
                      
                      <div className="flex flex-col max-w-[78%]">
                        <div 
                          className={`p-3 px-4 rounded-[1.35rem] text-sm leading-relaxed ${
                            isAssistant 
                              ? 'bg-white dark:bg-zinc-900 border border-brand-100/40 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-none shadow-sm' 
                              : 'bg-brand-600 dark:bg-brand-700 text-white rounded-br-none shadow-md shadow-brand-500/10'
                          }`}
                        >
                          <p className="whitespace-pre-line break-words">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start items-end gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-cyan-900 border border-brand-800/40 flex items-center justify-center shrink-0">
                      <Bot size={15} className="text-cyan-400" />
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-brand-100/40 dark:border-zinc-800 rounded-[1.35rem] rounded-bl-none p-3 px-4 flex items-center gap-2 text-zinc-400 shadow-sm">
                      <Loader2 size={16} className="animate-spin text-brand-500" />
                      <span className="text-xs font-mono">{lang === 'ID' ? 'Sedang mengetik...' : 'Typing...'}</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* QUICK SUGGESTIONS CONTAINER */}
              {messages.length <= 1 && !isLoading && (
                <div className="px-4 py-2 border-t border-brand-100/40 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/15 flex flex-wrap gap-2">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q.query)}
                      className="text-xs bg-white dark:bg-zinc-900 border border-brand-100/60 dark:border-zinc-800 text-brand-600 dark:text-brand-300 rounded-full px-3 py-1.5 hover:bg-brand-50 hover:border-brand-300 dark:hover:bg-zinc-800 transition-colors duration-200"
                    >
                      {q.text}
                    </button>
                  ))}
                </div>
              )}

              {/* CHAT INPUT CONTAINER */}
              <div className="p-3 bg-white dark:bg-zinc-950 border-t border-brand-100/60 dark:border-zinc-800">
                <div className="relative flex items-center bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-brand-500/50 transition-shadow">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={lang === 'ID' ? "Tulis pesan Anda..." : "Type your message..."}
                    className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white outline-none px-3 font-sans"
                    disabled={isLoading}
                  />
                  
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className={`p-2.5 rounded-xl transition-all ${
                      inputMessage.trim() && !isLoading
                        ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-md'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={15} />
                  </button>
                </div>
                
                <div className="text-[10px] text-zinc-400 text-center mt-2 flex items-center justify-center gap-1">
                  <Ship size={10} className="text-zinc-500" />
                  <span>PT Perintis Bermuda Perkasa Official Web Agent Support</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
