'use client';

import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className='flex flex-col w-full h-screen p-8 pt-24 items-center justify-center bg-black'>
      <div className="flex flex-col w-full max-w-[1000px] h-full justify-between items-center space-y-8">
        <ul className='flex flex-col w-full flex-1 overflow-y-scroll p-4 space-y-4'>
          {messages.map(m => (
            <li key={m.id} className='flex flex-col space-y-2 hover:bg-white/5'>
              <span className='text-sm text-white font-semibold'>{m.role === 'user' ? 'You' : 'Shopping Assistant'}</span>
              <span className='text-white/80 text-sm font-light'><ChatMessage message={m.content} /></span>
            </li>
          ))}
        </ul>
          
        <form className='w-full bg-white/5 border border-white/30 rounded-md shadow' onSubmit={handleSubmit}>
          <input
            className="text-white w-full p-4 placeholder:text-white/80 focus:outline-none"
            value={input}
            placeholder={`${messages.length === 0 ? "Say hi to your new shopping assistant..." : "Ask anything..."}`}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}

export default Chat;

const ChatMessage = ({ message }: { message: string }) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => (
          <a {...props} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
            {props.children}
          </a>
        ),
      }}
    >
      {message}
    </ReactMarkdown>
  );
};