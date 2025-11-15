import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default function Chatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Bonjour ! Je suis l’assistant Dakar Dem Dikk. Comment puis-je vous aider ?',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState(null);

  const categories = [
    { id: 'annulation', label: '❌ Annuler une réservation', icon: '❌' },
    { id: 'probleme_scan', label: '📱 Problème de scan', icon: '📱' },
    { id: 'suggestion', label: '💡 Faire une suggestion', icon: '💡' },
    { id: 'autre', label: '💬 Autre question', icon: '💬' }
  ];

  // 🔥 Réponses automatiques personnalisées selon le contexte
  const getBotReply = (userMsg, cat) => {
    const msg = userMsg.toLowerCase();
    if (cat === 'annulation' || msg.includes('annuler'))
      return '🗑️ D’accord. Veuillez fournir le numéro de votre réservation et la date du trajet, nous allons l’annuler pour vous.';
    if (cat === 'probleme_scan' || msg.includes('scan'))
      return '📱 Vérifiez que votre QR code est bien visible et que la caméra n’est pas obstruée. Si le problème persiste, envoyez-nous une capture.';
    if (cat === 'suggestion' || msg.includes('suggest'))
      return '💡 Merci pour votre suggestion ! Nous prenons vos remarques très au sérieux.';
    if (msg.includes('merci') || msg.includes('thanks'))
      return '😊 Avec plaisir ! N’hésitez pas à revenir si vous avez d’autres questions.';
    if (msg.includes('horaire') || msg.includes('bus'))
      return '🕒 Les bus circulent toutes les 15 à 30 minutes selon la ligne. Vous pouvez consulter les horaires sur la page "Mes Bus".';
    return '✅ Merci pour votre message ! Un agent du support va vous répondre sous peu.';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);

    // Envoi au backend (support)
    try {
      await axios.post(`${API_URL}/support/messages`, {
        userId: user?.id,
        userName: user?.name || 'Visiteur',
        category: category || 'general',
        message: input
      });
    } catch (error) {
      console.error('Erreur envoi message:', error);
    }

    // Réponse automatique améliorée
    const botText = getBotReply(input, category);
    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      text: botText,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    setTimeout(() => setMessages(prev => [...prev, botResponse]), 800);
    setInput('');
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat.id);
    const botMessage = {
      id: Date.now(),
      type: 'bot',
      text: `✅ Vous avez choisi : ${cat.label}. Décrivez votre situation et nous vous aiderons rapidement.`,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-ddd-yellow-500 to-ddd-red-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 border-4 border-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Fenêtre chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border-4 border-ddd-yellow-400 flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-ddd-yellow-500 to-ddd-red-500 p-4 rounded-t-xl text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-ddd-red-600" />
              </div>
              <div>
                <h3 className="font-bold">Assistant DDD</h3>
                <p className="text-xs text-white/90">En ligne 24/7</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {!category && messages.length === 1 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat)}
                    className="p-3 bg-white border-2 border-ddd-yellow-400 rounded-lg hover:bg-ddd-yellow-50 transition-colors text-sm font-medium"
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs">{cat.label.split(' ').slice(1).join(' ')}</div>
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-ddd-green-500 to-ddd-green-600 text-white'
                      : 'bg-white border-2 border-ddd-yellow-300'
                  } rounded-lg p-3 shadow`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t-2 border-ddd-yellow-400 bg-white rounded-b-xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Écrivez votre message..."
                className="flex-1 px-4 py-2 border-2 border-ddd-yellow-400 rounded-lg focus:ring-2 focus:ring-ddd-green-500 focus:border-ddd-green-500"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-ddd-green-500 to-ddd-green-600 text-white p-2 rounded-lg hover:from-ddd-green-600 hover:to-ddd-green-700 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
