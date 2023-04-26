import Chat from "./Chat";
import { useEffect, useState } from "react";
import React from "react";
import io from 'socket.io-client';
import styles from "./Chat.module.css";


const socket = io('http://localhost:3000');

function ChatContainer(props) {
    

    return (
      <Chat />
    );
  }


  export default ChatContainer;