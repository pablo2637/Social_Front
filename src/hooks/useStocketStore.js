import { useDispatch, useSelector } from 'react-redux';
import { onConnected, onConnecting, onConnectError, onDisconnect, onReconnect, onReconnectAttempt, onReconnectFailed, onSending } from '../store/slice/socketSlice';
import { SocketContext } from '../contexts/SocketContext';
import { useContext } from 'react';

export const useStocketStore = () => {

    const { socket, setSocket } = useContext(SocketContext);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const onConnect = () => dispatch(onConnecting());

    const onConnectSuccess = () => dispatch(onConnected());

    const onReconnecting = () => dispatch(onReconnectAttempt());

    const onReconnectionFailed = () => dispatch(onReconnectFailed());

    const onReconnectSuccess = () => dispatch(onReconnect());

    const onDisconnection = () => dispatch(onDisconnect());

    const onConnectionEror = () => dispatch(onConnectError());


    return {
        onConnect,
        onConnectSuccess,
        onReconnecting,
        onReconnectionFailed,
        onReconnectSuccess,
        onDisconnection,
        onConnectionEror
    }
}
