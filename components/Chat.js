import React from "react";
import io from 'socket.io-client';
import styles from './Chat.module.css';

function Chat() {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const socket = io();

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('message', inputValue);
    setInputValue('');
  };

  React.useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', message: data }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const showMessages = () => {
    return messages.map((message, index) => (
      <MessageBubble
        key={index}
        message={message.message}
        role={message.role}
      />
    ));
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
  const messageClass = props.role === 'user' ? 'user' : 'assistant';

  return (
    <div className={`${styles['message-container']} ${styles[`${messageClass}-message-container`]}`}
    >
       
        <div className={`${styles['chat-bubble']} ${messageClass}`}>
          <div className={styles['assistant-avatar']}>
            
          </div>
         </div>
        
        <div className={`${styles['chat-bubble']} ${messageClass}`}>{props.message}</div>
      
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
