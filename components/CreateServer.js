import { useState } from 'react';
import socket from './socketInstance';

export default function CreateServer() {
const [code, setCode] = useState('');

useEffect(() => {
  const redirectToChat = () => {
    console.log('Received redirect-to-chat event');
    if (code) {
      window.location.href = '/chat';
    }
  };

  socket.on('redirect-to-chat', redirectToChat);

  return () => {
    socket.off('redirect-to-chat', redirectToChat);
  };
}, [code]);

const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }, body: JSON.stringify({
    })
    });
    const data = await response.json();
    console.log(data)
    setCode(data.id);
    socket.emit('join-room', data.id);

  }
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Create Game</button>
      {code && <p>Your game code is: {code}</p>}
    </form>
  );
}
