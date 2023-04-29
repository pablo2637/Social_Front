import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { NavBarUser } from './components/NavBarUser';
import { useAuthStore } from './hooks/useAuthStore';
import { AppRoutes, UserRoutes } from './routers'
import { io } from 'socket.io-client';
import { Chat } from './components/Chat';

// const socket = io.connect(import.meta.env.VITE_URL_CHAT_BACK);

function App() {

  const {
    user,
    isChecking,
    status
  } = useAuthStore();


  const [username, setUsername] = useState("");
  const [room] = useState("1");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (

    <>
      <p>Status: {status} - isChecking: {isChecking.toString()} - user: {user.name}</p>

      {
        (status === 'authenticated') && <img src={user.image} alt="" />

      }

      <header>
        <p>Social Connect</p>
      </header>
      {
        (status === 'authenticated')
          ?
          <NavBarUser />
          :
          <NavBar />
      }

      <main>

        {
          (status === 'authenticated')
            ?
            <UserRoutes />
            :
            <AppRoutes />
        }

      </main>


      <footer>
        <p>Footer</p>
      </footer>

      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>Join A Chat</h3>
            <input
              type="text"
              placeholder="John..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>

    </>
  );

}

export default App
