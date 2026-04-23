"use client";

import React, { useEffect, useState } from 'react';
import { LoaderCircle, MessageCircle, Send, BotMessageSquare, X } from "lucide-react";

export default function ChatWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hola, soy el asistente de triaje veterinario. ¿Qué le sucede a tu mascota?",
    },
  ]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const trimmedMessage = inputValue.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    setInputValue("");
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        text: trimmedMessage,
      },
    ]);

    try {
      setIsLoading(true);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      const data = await response.json().catch(() => ({}));
      const botReply =
        typeof data?.message === "string" && data.message.trim()
          ? data.message
          : "Lo siento, estamos experimentando interrupciones. Por favor, llamanos directamente.";

      if (!response.ok) {
        throw new Error(data?.error || "Error en la respuesta del servidor");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: botReply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Lo siento, estamos experimentando interrupciones. Por favor, llamanos directamente.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-white shadow-lg transition hover:bg-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        aria-expanded={isOpen}
        aria-controls="veterinary-chat-panel"
      >
        {isOpen ? <X size={22} /> : <BotMessageSquare size={22} />}
      </button>

      {isOpen && (
        <section
          id="veterinary-chat-panel"
          className="absolute bottom-20 right-0 flex h-[32rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          role="dialog"
          aria-label="Chat de triaje veterinario"
        >
          <header className="flex items-center justify-between border-b border-slate-200 bg-blue-900 px-4 py-3 text-white">
            <div>
              <h2 className="text-sm font-semibold">Triaje veterinario</h2>
              <p className="text-xs text-blue-100">Asistente disponible 24/7</p>
            </div>
            <button
              type="button"
              onClick={toggleChat}
              className="rounded-md p-1 transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              aria-label="Cerrar ventana de chat"
            >
              <X size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                  message.role === "user"
                    ? "ml-auto bg-blue-900 text-white"
                    : "bg-white text-slate-700"
                }`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="inline-flex max-w-[85%] items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
                <LoaderCircle size={16} className="animate-spin text-blue-900" />
                <span>Escribiendo...</span>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="border-t border-slate-200 bg-white p-3"
            aria-label="Formulario de envío de mensaje"
          >
            <div className="flex items-center gap-2">
              <label htmlFor="chat-input" className="sr-only">
                Escribe tu mensaje
              </label>
              <input
                id="chat-input"
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Describe el síntoma de tu mascota..."
                className="h-10 flex-1 rounded-xl border border-slate-300 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white transition hover:bg-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Enviar mensaje"
              >
                <Send size={17} />
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
