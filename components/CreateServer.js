import { useState, useRef } from 'react';
import socket from './socketInstance';
import styles from '../styles/CreateServer.module.css';

export default function CreateServer() {
  const [code, setCode] = useState('');
  const codeRef = useRef(null);
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
    socket.once('redirect-to-chat', () => {
      window.location.href = '/chat';
    }
    );
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
