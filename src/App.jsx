import { NavBar } from './components/NavBar';
import { NavBarUser } from './components/NavBarUser';
import { AppRoutes, UserRoutes } from './routers'
import { useSelector } from 'react-redux';
import { SocketContext } from './contexts/SocketContext';
import { useContext, useEffect } from 'react';
import { useStocketStore } from './hooks/useStocketStore';
import { io } from 'socket.io-client';

function App() {

  const { status, user, isLoading, isChecking } = useSelector((state) => state.auth);

  const { isReceiving, isSending, isConnecting, connState } = useSelector((state) => state.socket)

  const { socket, setSocket } = useContext(SocketContext);
  const { onConnect, onConnectSuccess, onConnectionEror, onDisconnection, onReconnectSuccess, onReconnecting, onReconnectionFailed } = useStocketStore();


  useEffect(() => {

    const newSocket = io.connect(import.meta.env.VITE_URL_CHAT_BACK, {
      reconnection: true,
      reconnectionDelay: 2000
    });

    setSocket(newSocket);
    onConnect();

    return () => newSocket.disconnect();
  }, []);


  useEffect(() => {

    if (socket) {


      socket.on('inviteSent', (data) => {
        console.log('data', data)
      })


      socket.on("connect", () => {
        onConnectSuccess();
      });

      socket.on("disconnect", () => {
        onDisconnection();
      });

      socket.on("reconnect_attempt", () => {
        onReconnecting();
      });

      socket.on("reconnect", () => {
        onReconnectSuccess();
      });

      socket.on("reconnect_failed", () => {
        onReconnectionFailed();
      });

      socket.on("connect_error", () => {
        onConnectionEror();
      });
    }

  }, [socket]);

  return (

    <>
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

      <p>Status: {status} - isLoading: {isLoading.toString()} - isChecking: {isChecking.toString()} - user: {user.name}</p>

      {
        (status === 'authenticated') && <img key={Date.now()} src={user.image} width={150} alt="" />

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

        {(socket) && <p>socket.id: {socket.id}</p>}
        <p>isReceiving: {isReceiving.toString()} - isSending: {isSending.toString()} - isConnecting: {isConnecting.toString()} - connState: {connState}</p>

      </footer>

    </>
  );

}

export default App
