import { useState, useEffect } from 'react';
import styles from '../styles/JoinServer.module.css';
import socket from './socketInstance';

export default function JoinServer() {
  const [roomId, setRoomId] = useState('');


  useEffect(() => {
    socket.on('redirect-to-chat', () => {
      console.log('Received redirect-to-chat event');
      window.location.href = '/chat';
    });

    return () => {
      socket.off('redirect-to-chat'); // Clean up the event listener when the component unmounts
    };
  });
  useEffect(() => {
    if (roomId) {
      // Send the client-ready event when the roomId changes
      socket.emit('client-ready', roomId, () => {
        console.log('Server acknowledged client-ready event');
      });
    }
  }, [roomId]);
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
      // socket.emit('client-ready', roomId, () => {
      //   console.log('Server acknowledged client-ready event');
      // });
      // socket.once('redirect-to-chat', () => {
      //   console.log('Received redirect-to-chat event');
      //   window.location.href = '/chat';
      // });
    }
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

