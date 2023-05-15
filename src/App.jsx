import { NavBarUser, NavBar, NavBarAdmin } from './components';
import { AdminRoutes, AppRoutes, UserRoutes } from './routers'
import { useSelector } from 'react-redux';
import { SocketContext } from './contexts/SocketContext';
import { useContext, useEffect, useState } from 'react';
import { useSocketStore } from './hooks/useSocketStore';
import { io } from 'socket.io-client';


function App() {

  const { status, user, isLoading, isChecking } = useSelector((state) => state.auth);
  const { isReceiving, isSending, isConnecting, connState, chats } = useSelector((state) => state.socket)

  const { socket, setSocket } = useContext(SocketContext);
  const { operations, onConnect } = useSocketStore();
  const [reconnect, setReconnect] = useState(false);


  const [theme, setTheme] = useState(false);


  const handleOnReconnect = ({ target }) => {
    target.disabled = true;

    setReconnect(true);

  };


  const newConnection = () => {

    const newSocket = io.connect(import.meta.env.VITE_URL_CHAT_BACK, {
      reconnection: true,
      reconnectionAttempts: import.meta.env.VITE_RECONNECTION_ATTEMPTS,
      reconnectionDelay: 4000
    });

    setSocket(newSocket);
    onConnect();

    return newSocket;

  }



  useEffect(() => {

    const newSocket = newConnection();

    return () => newSocket.disconnect();
  }, []);




  useEffect(() => {

    if (!reconnect) return

    setReconnect(false);
    const newSocket = newConnection();

    return () => newSocket.disconnect();
  }, [reconnect]);



  useEffect(() => {
    console.log('socket', user);
    if (socket)
      operations();


  }, [socket]);

  return (

    <>

      <header className='header'>
        <div>

          <div className='divLogo'>
            <img src="../assets/logo.png" alt="Logo" />
          </div>
          <p>Social Connect</p>

        </div>

        {
          (status === 'authenticated' || status === 'admin') &&

          <div className='divUserImage'>
            <img key={Date.now()} src={user.image} title={`Foto de ${user.name}`} alt={`Foto de ${user.name}`} />
          </div>

        }

      </header>

      {
        (status === 'authenticated')
          ?
          <NavBarUser />

          :
          (status === 'admin')
            ?
            <NavBarAdmin />

            :
            <NavBar />
      }

      <main className='main'>
        {
          (connState == 'stop' || connState == 'disconnected') &&
          <div className='divReconnect'>
            <p>Fallo en la conexión al servidor</p>
            <button onClick={handleOnReconnect}><i className="fa-solid fa-arrows-rotate"></i> Reconectar</button>
          </div>
        }

        {

          (status === 'authenticated')
            ?
            <UserRoutes />

            :
            (status === 'admin')
              ?
              <AdminRoutes />

              :
              <AppRoutes />
        }

      </main>


      <footer className='footer'>
        <p>© Pablo Pace - 2023 {`- (${(socket) && socket.id})`} </p>
      </footer>

    </>
  );

}

export default App
