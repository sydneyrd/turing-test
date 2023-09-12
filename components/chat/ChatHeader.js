import React from "react";

import styles from '../../styles/ChatHeader.module.css';
import {useSessionStorage} from 'react-use';
import { SocketContext } from '../socketInstance';
//i need to import and send the roomId to the server


function ChatHeader(props) {
    const socket = React.useContext(SocketContext);
    const [players, setPlayers] = React.useState([]);
    const [roomId, setRoomId] = useSessionStorage('roomId');

    React.useEffect(() => {
       if (roomId) {socket.emit('get-players', roomId);}

       else {console.log('no room id')}
    }, []);

React.useEffect(() => {

socket.on('players', (data) => {
    console.log(data)
    setPlayers(data);
    });
    }, []);
    
//i need to get all of the player names
//iterate through them and display them as spans
//then i need to deactivate them when they are voted out
//i should style them so that they are greyed out when they are voted out
    return (
      <header className={styles['chat-players-header']}>
        {players.map((player, index) => {
            return <span key={index} className={styles['chat-player']}>{player.name}</span>

        })
        }
        </header>
    );
  }


  export default ChatHeader;