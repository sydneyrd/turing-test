import { useState, useRef, useEffect } from 'react';
import socket from './socketInstance';
import styles from '../styles/CreateServer.module.css';

export default function CreateServer() {
  const [code, setCode] = useState('');
  const codeRef = useRef(null);
  const [waitingForPlayers, setWaitingForPlayers] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    socket.once('redirect-to-chat', () => {
      console.log('Received redirect-to-chat event');
      window.location.href = '/chat';
    });
    return () => {
      socket.off('redirect-to-chat');
    };
  });
  useEffect(() => {
    if (code && buttonClicked) {
      // Send the client-ready event when the roomId changes and the button has been clicked
      socket.emit('client-ready', code, () => {
        console.log('Server acknowledged client-ready event');
      });
      setWaitingForPlayers(true); // Display the waiting popup
    }
  }, [code, buttonClicked]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonClicked(true);
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    setCode(data.id);
    socket.emit('join-room', data.id);
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
