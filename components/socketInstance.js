// socketInstance.js
// import io from 'socket.io-client';
// import socketIO from 'socket.io-client';
// import { createContext } from 'react';
// const socket = io();



// const socket = socketIO.connect('http://localhost:3000');
// export const SocketContext = createContext(socket);

// export default socket;


// SocketContext.js
import React from 'react';
import socketio from 'socket.io-client';

export const socket = socketio('http://localhost:3000/');
const SocketContext = React.createContext(socket);
 const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export { SocketContext, SocketProvider };
