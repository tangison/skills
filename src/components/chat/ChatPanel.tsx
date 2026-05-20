'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatCircle, X, PaperPlane } from '@phosphor-icons/react';
import type { ChatMessage } from '@/lib/types';

interface ChatPanelProps {
  chatOpen: boolean;
  onChatToggle: () => void;
}

export function ChatPanel({ chatOpen, onChatToggle }: ChatPanelProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatMessages, { role: 'user', content: userMsg }] }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'No response.' }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    }
    finally { setChatLoading(false); }
  };

  if (!chatOpen) return null;

  return (
    <div className="fixed right-4 bottom-20 sm:bottom-4 w-[340px] max-w-[calc(100vw-2rem)] z-50 border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)] shadow-[0_4px_24px_rgba(0,0,0,0.08)] flex flex-col max-h-[460px]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle-value)]">
        <div className="flex items-center gap-1.5">
          <ChatCircle size={12} weight="fill" className="text-brand" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.06em]">SkillsCamp AI</span>
        </div>
        <button onClick={() => onChatToggle()} className="text-secondary hover:text-primary transition-colors" aria-label="Close chat">
          <X size={12} weight="bold" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[180px]">
        {chatMessages.length === 0 && (
          <p className="text-secondary text-[11px] text-center py-6">Ask about skills, workflows, or recommendations.</p>
        )}
        {chatMessages.map((msg, i) => (
          <div key={i} className={`${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block max-w-[85%] rounded-md px-2.5 py-1.5 text-[11px] leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)]'
                : 'bg-[var(--surface-02)]'
            }`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {chatLoading && (
          <div className="text-left">
            <div className="inline-block bg-[var(--surface-02)] rounded-md px-2.5 py-1.5 text-[11px] text-secondary">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[var(--border-subtle-value)] p-2.5">
        <form
          onSubmit={e => { e.preventDefault(); handleChat(); }}
          className="flex gap-1.5"
        >
          <input
            type="text"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            placeholder="Ask about skills..."
            aria-label="Chat message input"
            className="flex-1 px-2.5 py-1.5 text-[11px] border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
          />
          <button
            type="submit"
            disabled={chatLoading || !chatInput.trim()}
            className="p-1.5 bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)] rounded-md hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40"
          >
            <PaperPlane size={11} weight="bold" />
          </button>
        </form>
      </div>
    </div>
  );
}
