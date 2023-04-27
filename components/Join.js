import { useState, useEffect } from 'react';
import styles from '../styles/JoinServer.module.css';
import socket from './socketInstance';
import LoadingPopup from './loading/Loading';

export default function JoinServer() {
  const [roomId, setRoomId] = useState('');
  const [waitingForPlayers, setWaitingForPlayers] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);



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
    if (roomId && buttonClicked) {
      // Send the client-ready event when the roomId changes and the button has been clicked
      socket.emit('client-ready', roomId, () => {
        console.log('Server acknowledged client-ready event');
      });
      setWaitingForPlayers(true); // Display the waiting popup
    }
  }, [roomId, buttonClicked]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonClicked(true);
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
      </form>
      {waitingForPlayers && <LoadingPopup />}
      </div>
    </div>
  );
}

