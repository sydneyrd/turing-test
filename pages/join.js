import styles from '../styles/JoinServer.module.css';
import JoinServer from '../components/Join';


export default function JoinPage() {
  // const [roomId, setRoomId] = useState('');


  // socket.on('redirect-to-chat', () => {
  //   window.location.href = '/chat';
  // });
  // socket.on('redirect-to-chat', () => {
  //   console.log('Received redirect-to-chat event');
  //   window.location.href = '/chat';
  // });
  
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const response = await fetch('/api/chat/join', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       roomId,
  //     })
  //   });
  //   // Handle response from server
  // }
  
  return (
    <JoinServer />
  );
}
