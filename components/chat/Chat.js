// import socket from "./socketInstance";
import React from "react";
import styles from '../../styles/Chat.module.css';

import {useSessionStorage} from 'react-use';
import { SocketContext } from '../socketInstance';


function Chat() {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [player, setPlayer] = useSessionStorage('player');
  const [roomId, setRoomId] = useSessionStorage('roomId');
  const chatContainerRef = React.useRef(null);
  const socket = React.useContext(SocketContext);
console.log(player)
console.log('messages', messages)
  React.useEffect(() => {
    if (roomId) {
      console.log('Joining room')
      socket.emit('join-room', roomId);
    }
  }, [roomId]);

  React.useEffect(() => {
    // Scroll to the bottom of the element when myState updates
    if (chatContainerRef ) {chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight}
    else {console.log('no ref')}
    
  }, [messages]);
  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('send-message', {roomId: roomId, player: player, message: inputValue});
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
      let messageClass = player === message.player ? 'user' : 'assistant';
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
        {/* <ChatHeader /> */}
        <div className={styles['msg-container']} ref={chatContainerRef}>{showMessages()}</div>
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
    <div className={`${styles[`${props.messageClass}-message-container`]}`}
    >
        {props.messageClass === 'assistant' ?
        <div className={`${styles['chat-bubble']}-${props.messageClass}`}> {props.message}
          <div className={styles['assistant-avatar']}> {props.player} 
            
          </div>
         </div> : ''}
      {props.messageClass === 'user' ?
      
        <div className={`${styles['chat-bubble']}-${props.messageClass}`}> {props.message}
        <div className={styles['user-avatar']}>{props.player} </div> </div> : ''}
      
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


export default Chat;
