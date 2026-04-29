import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Minus, Maximize2, RefreshCw, Languages, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sources?: string[];
}

const SUGGESTED_PROMPTS = [
  "How do I register to vote?",
  "When is the next polling phase?",
  "What is the Model Code of Conduct?",
  "How to find my polling booth?",
  "Voter ID correction process"
];

const AI_KNOWLEDGE_BASE: Record<string, string> = {
  "register": "To register as a new voter, you can apply online through the NVSP portal (voterportal.eci.gov.in) or use the Voter Helpline App. You will need Form 6 for new registration.",
  "polling": "The next polling phase (Phase 3) is scheduled for April 24, 2026. Please check your constituency details on the Dashboard.",
  "conduct": "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI to regulate political parties and candidates prior to elections. It ensures free and fair elections.",
  "booth": "You can find your polling booth by searching your EPIC number on our 'Verify' page or by using the 'Booth Locator' feature on the ECI official app.",
  "voter id": "For corrections in your Voter ID (EPIC), please use Form 8. This can be submitted online or at your nearest Electoral Registration Office (ERO).",
  "default": "I am the ECI AI Assistant. I can help you with voter registration, polling schedules, and election rules. How can I assist you today?"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Namaste! I am your ECI AI Assistant. How can I help you navigate the 2026 Elections today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = AI_KNOWLEDGE_BASE["default"];
      
      for (const key in AI_KNOWLEDGE_BASE) {
        if (lowerText.includes(key)) {
          responseText = AI_KNOWLEDGE_BASE[key];
          break;
        }
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
        sources: ["ECI Guidelines 2026", "Voter Handbook v4.2"]
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Toggle Button */}
      <motion.button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="chatbot-badge">ECI AI</span>}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`chatbot-panel ${isMinimized ? 'minimized' : ''}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="header-info">
                <div className="ai-avatar">ECI</div>
                <div>
                  <div className="ai-name">Bharat Nirwachan AI</div>
                  <div className="ai-status">Online • Verified</div>
                </div>
              </div>
              <div className="header-actions">
                <button onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')} className="icon-btn">
                  <Languages size={18} />
                </button>
                <button onClick={() => setIsMinimized(!isMinimized)} className="icon-btn">
                  {isMinimized ? <Maximize2 size={18} /> : <Minus size={18} />}
                </button>
                <button onClick={toggleChat} className="icon-btn">
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="chatbot-messages" ref={scrollRef}>
                  <div className="welcome-banner">
                    <Info size={14} />
                    <span>Official ECI Assistant (V1.0)</span>
                  </div>
                  
                  {messages.map((msg) => (
                    <div key={msg.id} className={`message-row ${msg.sender}`}>
                      <div className="message-bubble">
                        {msg.text}
                        {msg.sources && (
                          <div className="message-sources">
                            {msg.sources.map(s => <span key={s} className="source-pill">{s}</span>)}
                          </div>
                        )}
                      </div>
                      <div className="message-time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="message-row ai">
                      <div className="typing-indicator">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggestions */}
                <div className="chatbot-suggestions">
                  <div className="suggestions-scroll">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button 
                        key={prompt} 
                        className="suggestion-chip"
                        onClick={() => handleSend(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <form 
                  className="chatbot-input-area"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(inputValue);
                  }}
                >
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask ECI Assistant..."
                    className="chat-input"
                  />
                  <button type="button" className="icon-btn" onClick={() => setMessages([messages[0]])}>
                    <RefreshCw size={18} />
                  </button>
                  <button type="submit" className="send-btn" disabled={!inputValue.trim()}>
                    <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
