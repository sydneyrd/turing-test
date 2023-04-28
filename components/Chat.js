// import socket from "./socketInstance";
import React from "react";
import styles from './Chat.module.css';
import {useSessionStorage} from 'react-use';
import { SocketContext } from '../components/socketInstance';


function Chat() {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [player, setPlayer] = useSessionStorage('player');
  const [roomId, setRoomId] = useSessionStorage('roomId');
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    if (roomId) {
      console.log('Joining room')
      socket.emit('join-room', roomId);
    }
  }, [roomId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('send-message', {roomId: roomId, player: player.player, message: inputValue});
    setInputValue('');
  };

  React.useEffect(() => {
    socket.on('messages', (data) => {
      console.log(data)
      setMessages(data);
    });
  });

  const showMessages = () => {
    
    return messages.map((message, index) => {
      let messageClass = player.player === message.player ? 'user' : 'assistant';
    return  <MessageBubble
      messageClass={messageClass}
        key={index}
        message={message.message}
        role={message.role}
        player={message.player}
      />
  });
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Header headerText={"hello"} pText={"howdy do"} p2Text={"put somethin here mebbe"} />
      <div className={styles['chat-container']}>
        <ChatHeader />
        <div className={styles['msg-container']}>{showMessages()}</div>
        <form onSubmit={handleSubmit} className={styles['input-container']}>
          <input
            id="chat"
            type="text"
            onChange={handleChange}
            placeholder="Type something..."
            value={inputValue}
          />
          <button className={styles['input-submit']} type="submit" />
        </form>
      </div>
    </div>
  );
}

function MessageBubble(props) {

  return (
    <div className={`${styles['message-container']}-${styles[`${props.messageClass}-message-container`]}`}
    >
        {props.messageClass === 'assistant' ?
        <div className={`${styles['chat-bubble']}-${props.messageClass}`}>
          <div className={styles['assistant-avatar']}> {props.player} player name here {props.message}
            
          </div>
         </div> : ''}
      {props.messageClass === 'user' ?
        
        <div className={`${styles['chat-bubble']}-${props.messageClass}`}> {props.player} or player name here {props.message}</div> : ''}
      
    </div>
  );
}

function Header(props) {
  return (
    <div className={styles.header}>
      <div className={styles['header-img']} />
      <h1>{props.headerText}</h1>
      <h2>{props.pText}</h2>
      <p>{props.p2Text}</p>
    </div>
  );
}

function ChatHeader() {
  return (
    <div className={styles['chat-header']}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
}

export default Chat;
