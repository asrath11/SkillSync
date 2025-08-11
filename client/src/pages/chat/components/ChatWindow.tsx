import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '@/context/authProvider';
import { getMessages } from '@/api/message';
interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
}

function ChatWindow({ userProfile }: { userProfile: any }) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;
    getMessages(user?.id || '', userProfile?.userId || '').then((data) => {
      setMessages(data);
    });

    // Join own room
    if (user?.id) {
      socket.emit('join', user.id);
    }

    // Listen for incoming private messages
    socket.on('private-message', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id, userProfile?.userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: message,
      senderId: user?.id || '',
      receiverId: userProfile?.userId,
      timestamp: new Date(),
    };

    socketRef.current.emit('private-message', newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setMessage('');
  };

  return (
    <div className='relative w-[80%] flex flex-col h-screen'>
      {/* Chat header */}
      <div className='bg-card text-md flex items-center p-4 w-full border-b'>
        <img
          src={
            userProfile?.profileImage ||
            'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          }
          alt='Profile Image'
          className='w-10 h-10 rounded-full mr-3'
        />
        <span className='font-medium'>{userProfile?.fullName}</span>
      </div>

      {/* Messages */}
      <div className='flex-1 p-4 overflow-y-auto'>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.senderId === user?.id ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.senderId === user?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {msg.content}
            </div>
            <div className='text-xs text-muted-foreground mt-1'>
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className='p-4 border-t'>
        <div className='relative'>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type a message...'
            className='pr-12'
          />
          <button
            type='submit'
            className='absolute right-2 top-1/2 -translate-y-1/2 text-primary'
          >
            <Send size={20} className='cursor-pointer' />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;
