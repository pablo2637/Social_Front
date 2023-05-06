import { NavBarUser, NavBar, NavBarAdmin } from './components';
import { AdminRoutes, AppRoutes, UserRoutes } from './routers'
import { useSelector } from 'react-redux';
import { SocketContext } from './contexts/SocketContext';
import { useContext, useEffect, useState } from 'react';
import { useSocketStore } from './hooks/useSocketStore';
import { io } from 'socket.io-client';

function App() {

  const { status, user, isLoading, isChecking } = useSelector((state) => state.auth);
  const { isReceiving, isSending, isConnecting, connState } = useSelector((state) => state.socket)

  const { socket, setSocket } = useContext(SocketContext);
  const { operations, onConnect } = useSocketStore();

  useEffect(() => {

    const newSocket = io.connect(import.meta.env.VITE_URL_CHAT_BACK, {
      reconnection: true,
      reconnectionAttempts: 30,
      reconnectionDelay: 4000
    });

    setSocket(newSocket);
    onConnect();

    return () => newSocket.disconnect();
  }, []);


  useEffect(() => {

    if (socket)
      operations();


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
          (status === 'admin')
            ?
            <NavBarAdmin />

            :
            <NavBar />
      }

      <p>Status: {status} - isChecking: {isChecking.toString()} - user: {user.name} - email: {user.email}</p>

      {(socket) && <p>socket.id: {socket.id}</p>}
      <p>isConnecting: {isConnecting.toString()} - connState: {connState}</p>
      {
        (connState == 'stop') && <button>Conectar</button>
      }

      {
        (status === 'authenticated') && <img key={Date.now()} src={user.image} width={150} alt="" />

      }

      <main>

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


      <footer>
        <p>Footer</p>
      </footer>

    </>
  );

}

export default App
