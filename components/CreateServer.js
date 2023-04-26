import { useState } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function CreateServer() {
const [code, setCode] = useState('');
socket.on('redirect-to-chat', () => {
  window.location.href = '/chat';
});
const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }, body: JSON.stringify({
        player: 1,
    })
    });
    const data = await response.json();
    console.log(data)
    setCode(data.id);
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Create Game</button>
      {code && <p>Your game code is: {code}</p>}
    </form>
  );
}
