import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, MessageCircle, Bot, User, Sparkles } from 'lucide-react';

export default function ChatSupportModal() {
  const { isChatOpen, setIsChatOpen } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: 'Olá! Bem-vindo ao suporte da RiffaDigital. 👋 Como podemos ajudar você hoje com sua rifa ou recebimento via Pix?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isChatOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate smart support answer
    setTimeout(() => {
      let reply = 'Entendido! Nosso time já recebeu sua solicitação. O repasse das cotas é automático via Pagar.me Stone diretamente para a chave cadastrada.';
      if (userMsg.text.toLowerCase().includes('taxa')) {
        reply = 'Nossas taxas variam entre 6% a 10% por bilhete pago, dependendo do plano escolhido (Starter 10%, Básico 8% ou Personalizado 6%). Sem nenhuma mensalidade fixa!';
      } else if (userMsg.text.toLowerCase().includes('pix')) {
        reply = 'A confirmação do Pix ocorre em segundos com baixa automática dos números no painel da rifa e notificação imediata para o comprador.';
      } else if (userMsg.text.toLowerCase().includes('sorteio') || userMsg.text.toLowerCase().includes('loteria')) {
        reply = 'Você pode vincular sua rifa ao concurso oficial da Loteria Federal! Ao informar os prêmios do concurso, o sistema calcula os números vencedores automaticamente.';
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent',
          text: reply
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-full max-w-sm overflow-hidden rounded-3xl border border-brand/20 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0D1B2A] flex flex-col h-[500px] animate-fade-up">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-night via-[#11283A] to-[#0C2F2B] p-4 text-white flex items-center justify-between border-b border-brand/20">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="h-9 w-9 bg-brand/20 rounded-xl flex items-center justify-center text-brand">
              <Bot className="h-5 w-5" />
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-night" />
          </div>
          <div>
            <div className="font-display font-bold text-sm leading-tight">Suporte RiffaDigital</div>
            <div className="text-[10px] text-brand">Atendimento online</div>
          </div>
        </div>

        <button
          onClick={() => setIsChatOpen(false)}
          className="h-8 w-8 rounded-xl border border-white/10 flex items-center justify-center text-gray-300 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages Thread */}
      <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'agent' && (
              <div className="h-6 w-6 rounded-full bg-brand-soft text-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="h-3.5 w-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-brand text-night font-semibold rounded-tr-none'
                  : 'bg-gray-100 dark:bg-[#10212C] text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200/60 dark:border-white/5'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick suggestions pills */}
      <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto text-[10px] border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#0F1F2C]">
        <button
          onClick={() => setInputText('Quais são as taxas por venda?')}
          className="whitespace-nowrap px-2 py-1 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand"
        >
          Taxas por venda?
        </button>
        <button
          onClick={() => setInputText('Como funciona o sorteio pela Loteria Federal?')}
          className="whitespace-nowrap px-2 py-1 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand"
        >
          Loteria Federal?
        </button>
        <button
          onClick={() => setInputText('Como recebo o dinheiro das vendas?')}
          className="whitespace-nowrap px-2 py-1 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand"
        >
          Recebimento Pix?
        </button>
      </div>

      {/* Input row */}
      <form onSubmit={handleSend} className="p-3 border-t border-gray-100 dark:border-white/10 flex items-center gap-2">
        <input
          type="text"
          placeholder="Digite sua dúvida..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-gray-900 dark:border-white/10 dark:bg-[#10212C] dark:text-white focus:outline-none focus:border-brand"
        />
        <button
          type="submit"
          className="h-9 w-9 rounded-xl bg-brand text-night flex items-center justify-center hover:bg-glow transition flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

    </div>
  );
}
