import { useState, useRef, useEffect } from 'react';
import socket from './socketInstance';
import styles from '../styles/CreateServer.module.css';

export default function CreateServer() {
  const [code, setCode] = useState('');
  const codeRef = useRef(null);
  useEffect(() => {
    socket.once('redirect-to-chat', () => {
      console.log('Received redirect-to-chat event');
      window.location.href = '/chat';
    });
    return () => {
      socket.off('redirect-to-chat');
    };
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    setCode(data.id);
    socket.emit('join-room', data.id);
    // socket.on('redirect-to-chat', () => {
    //   window.location.href = '/chat';
    // }
    // );
    socket.emit('client-ready', data.id, () => {
      console.log('Server acknowledged client-ready event');
    });
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeRef.current.textContent);
  }

  return (
    <form className={styles.createServer} onSubmit={handleSubmit}>
      <div className={styles.serverContainer}>
        <button type="submit" className={styles.createButton}>Create Game</button>
        {code && (
          <div className={styles.codeContainer}>
            <p ref={codeRef} className={styles.code}>{code}</p>
            <button type="button" className={styles.copyButton} onClick={handleCopy}>Copy</button>
          </div>
        )}
      </div>
    </form>
  );
}
