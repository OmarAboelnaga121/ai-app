'use client'

import { generateContent } from "@/api/api";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await generateContent(input);
      const parsedResponse = JSON.parse(response.response);
      setMessage(parsedResponse.message);
    } catch (error) {
      console.error("Error generating content:", error);
      setMessage("Error: Failed to generate or parse content.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>{message}</p> 
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Generate</button>
      </form>
    </div>
  );
}
