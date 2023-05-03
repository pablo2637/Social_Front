import { NavBar } from './components/NavBar';
import { NavBarUser } from './components/NavBarUser';
import { AppRoutes, UserRoutes } from './routers'
import { useSelector } from 'react-redux';
import { SocketContext } from './contexts/SocketContext';
import { useContext, useEffect } from 'react';
import { useSocketStore } from './hooks/useSocketStore';
import { io } from 'socket.io-client';
import { useAuthStore } from './hooks/useAuthStore';
import { useUserStore } from './hooks/useUserStore';

function App() {

  const { status, user, isLoading, isChecking } = useSelector((state) => state.auth);
  const { isReceiving, isSending, isConnecting, connState } = useSelector((state) => state.socket)

  const { socket, setSocket } = useContext(SocketContext);
  const { onConnect, onConnectSuccess, onConnectionEror, onDisconnection, onReconnectSuccess, onReconnecting, onReconnectionFailed } = useSocketStore();

  const { loadInvites, loadProfiles } = useUserStore();
  const { loadUser } = useAuthStore();


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


      socket.on('execute', async (data) => {

        switch (data.command) {
          case 'reload_profiles':
            await loadProfiles();
            break;

          case 'reload_invites':
            await loadInvites();
            break;

          case 'reload_user':
            await loadUser(user.email);
            break;

          case 'reload_invites-profile':
            await loadInvites();
            await loadProfiles();
            break;

          case 'reload_user-profile':
            await loadUser(user.email);
            await loadProfiles();
            break;

          case 'reload_user-invites':
            await loadUser(user.email);
            await loadInvites();
            break;

          case 'reload_all':
            await loadUser(user.email);
            await loadInvites();
            await loadProfiles();
            break;

        }

        console.log('execute command:', data.command)

      });


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
