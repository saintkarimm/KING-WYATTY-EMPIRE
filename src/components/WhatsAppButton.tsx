import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = '233246151688';
  const whatsappMessage = encodeURIComponent(
    'Hello! I found your website and would like to learn more about your properties.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 lg:right-6 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 lg:w-7 lg:h-7 fill-current" />
    </a>
  );
}
