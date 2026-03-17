import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: 'Hello! Welcome to Dream Luxury Real Estate Agency. How can I help you find your perfect property today?',
  },
];

const knowledgeBase: Record<string, string> = {
  'east legon': 'Yes, we have many properties available in East Legon! This is one of our prime locations with excellent amenities. Would you like to see available listings?',
  'spintex': 'Absolutely! We offer rental and sale properties in Spintex. It\'s a vibrant area with great connectivity. Shall I show you what\'s available?',
  'airport residential': 'Yes, we have premium properties in Airport Residential Area. This is one of the most sought-after neighborhoods in Accra.',
  'cantonments': 'We have beautiful properties in Cantonments! This area is known for its serene environment and upscale residences.',
  'nmai-dzorm': 'We have properties in Nmai-Dzorm and surrounding areas. Visit our office on the Trasacco Estate Road to learn more!',
  'trasacco': 'Our office is located on the Trasacco Estate Road in Nmai-Dzorm. We\'d love to meet you!',
  'rent': 'We have a wide range of rental properties across Accra. Could you tell me your preferred location and budget?',
  'buy': 'We can definitely help you buy property in Accra! We serve East Legon, Airport Residential, Cantonments, Spintex, Nmai-Dzorm, and many other prime areas.',
  'land': 'Yes, we specialize in land acquisition with verified documentation. We also offer land surveillance services to ensure your investment is secure.',
  'architectural': 'Yes, we provide architectural drawing services for your building projects. Our team can help bring your vision to life.',
  'consulting': 'We offer property consulting and valuation services to help you make informed decisions about your real estate investments.',
  'materials': 'We can supply building materials for your construction projects. Contact us for quality materials at competitive prices.',
  'office': 'Our office is located at Nmai-Dzorm, E Legon - Trasacco Estate Road. You\'re welcome to visit us or we can schedule a meeting at your convenience.',
  'contact': 'You can reach us at 024 615 1688 or email info@dreamluxuryrealestate.com. Our office is at Nmai-Dzorm, E Legon - Trasacco Estate Rd.',
  'price': 'Our property prices vary based on location and type. Rental properties start from affordable rates for studios, and we have options for every budget.',
  'hello': 'Hello! Welcome to Dream Luxury Real Estate Agency. How can I help you find your perfect property today?',
  'hi': 'Hi there! I\'m here to help you with your real estate needs. What are you looking for?',
};

function getResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }
  
  return "I'd be happy to help! Dream Luxury Real Estate Agency offers rentals, property sales, land acquisition, architectural drawings, land surveillance, building materials supply, property consulting and valuation in East Legon, Spintex, Airport Residential, Nmai-Dzorm, and other prime areas in and outside Accra. What specific information are you looking for?";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(input);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 right-4 lg:right-6 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-near-black text-white rotate-90'
            : 'bg-vivid-blue text-white hover:bg-vivid-blue/90'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-5 h-5 lg:w-6 lg:h-6" /> : <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-36 right-4 lg:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-vivid-blue p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-serif font-semibold text-white">Dream Luxury Assistant</h4>
            <p className="text-xs text-white/70">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-cloud-gray/50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  message.role === 'user'
                    ? 'bg-vivid-blue text-white rounded-br-md'
                    : 'bg-white text-near-black rounded-bl-md shadow-sm'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 rounded-full border-gray-200 focus:border-vivid-blue focus:ring-vivid-blue/20"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-full bg-vivid-blue hover:bg-vivid-blue/90 w-10 h-10"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
