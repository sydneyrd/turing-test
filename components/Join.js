import { useState, useEffect } from 'react';
import styles from '../styles/JoinServer.module.css';
import io from 'socket.io-client';

const socket = io();

export default function JoinServer() {
  const [roomId, setRoomId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/chat/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomId,
      })
    });
  
    const result = await response.json();
    if (result.success) {
      socket.emit('join-room', roomId);
      socket.once('redirect-to-chat', () => {
        console.log('Received redirect-to-chat event');
        window.location.href = '/chat';
      });
    }
    // Handle other responses from the server
  }
  
  
  
  return (
    <div className={styles.container}>
      <div className={styles.serverContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Enter Chat Room ID:
          <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} className={styles.input} />
        </label>
        <button type="submit" className={styles.button}>Join Chat</button>
      </form></div>
    </div>
  );
}

