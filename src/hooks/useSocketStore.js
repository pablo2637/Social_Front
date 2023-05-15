import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';

import { useUserStore } from './useUserStore';
import { useAuthStore } from './useAuthStore';

import { SocketContext } from '../contexts/SocketContext';

import { getLocal, setLocalChats } from '../helpers/localStorage';

import { onNewInvites } from '../store/slice/usersSlice';
import { onUpdateUser } from '../store/slice/authSlice';
import { onReconnectLimit, onSendMsg, onConnected, onConnecting, onConnectError, onDisconnect, onReconnect, onReconnectAttempt, onReconnectFailed, onSending, onLoadChats, onJoinChat, onUpdateID, onNewChats, onChatActive } from '../store/slice/socketSlice';


/**
 * @author Pablo
 * @module useSocketStore
 */


/**
 * Hook personalizado para almacenar el state de conexión del socket y los chats
 * @method useSocketStore
 */
export const useSocketStore = () => {

    const { user } = useSelector((state) => state.auth);
    const { chats } = useSelector((state) => state.socket);

    const { socket } = useContext(SocketContext);

    const { loadInvites, loadMsgs, loadFriends, loadProfiles, loadChats } = useUserStore();
    const { loadUser, logoutUser } = useAuthStore();
    const dispatch = useDispatch();


    /**
     * Gestiona todos los eventos provenientes del socket, ya sea por temas de conexión o por eventos generados por el servidor
     * @method operations
     * @async
     * @returns {json} OK
     */
    const operations = async () => {

        console.log('operations user', user)
        /**
         * Ejecuta instrucciones que llegan desde el servidor, para que el cliente vuelva a recargar información (ej: perfiles, invitaciones, chats, etc...)
         */
        socket.on('execute', (data) => {


            data.command.forEach(cmd => {
                console.log('command:', cmd)

                switch (cmd) {
                    case 'profiles':
                        loadProfiles();
                        break;

                    case 'invites':
                        loadInvites();
                        dispatch(onNewInvites(true));
                        break;

                    case 'user':
                        if (!user.isAdmin) loadUser(user.email);
                        break;

                    case 'chats':
                        // if (!user._id) dispatch(onUpdateUser(getLocal()));                        
                        loadChats(user._id);
                        break;

                    case 'msgs':
                        // if (!user._id) dispatch(onUpdateUser(getLocal()));
                        loadMsgs(user._id)
                        break;

                    case 'friends':
                        // if (!user._id) dispatch(onUpdateUser(getLocal()));
                        loadFriends(user._id)
                        break;

                    case 'identify':
                        // if (!user._id) dispatch(onUpdateUser(getLocal()));
                        socket.emit('whoAmI', { userID: user._id })
                        break;

                    case 'all':
                        loadInvites();
                        loadProfiles();
                        loadChats(user._id);
                        if (!user.isAdmin) loadUser(user.email);
                        break;

                    case 'logout':
                        user = {};
                        break;
                }

            });

            console.log('execute command:', data.command)
        });


        socket.on("connect", () => {
            console.log('connect');
            dispatch(onConnected());
        });

        socket.on("disconnect", () => {
            console.log('discon');
            dispatch(onDisconnect());
        });

        socket.on("reconnect_attempt", () => {
            console.log('aqui rec att')
            dispatch(onReconnectAttempt());
        });

        socket.on("reconnect", () => {
            console.log('aqui rec ok')
            dispatch(onReconnect());

            socket.emit('whoAmI', { userID: user._id });
        });

        socket.on("reconnect_failed", () => {
            console.log('aqui rec fail')
            dispatch(onReconnectFailed());
        });

        socket.on("connect_error", () => {
            console.log('error conn');

            dispatch(onReconnectFailed());

            dispatch(onReconnectAttempt());

            dispatch(onConnectError());

            if (socket.io._reconnectionAttempts >= import.meta.env.VITE_RECONNECTION_ATTEMPTS)
                dispatch(onReconnectLimit());
        });


        /**
         * Cuando un cliente se conecta al servidor, éste manda la petición para que se le envíe el ID para saber
         * quíen es el usuario conectado y verificar las salas de chats
         */
        socket.on('whoAreYou', async () => {

            console.log('whoAreYou', user._id)

            if (user)
                await socket.emit('whoAmI', { userID: user._id });

            else {
                console.log('whoAreYou getlocal');
                dispatch(onUpdateUser(getLocal()));
            }
        });



        /**
         * Modifica el _id del chat
         */
        socket.on('chatID', (data) => {
            console.log('chatID', data)

            const ind = findChat(data.chat.sender, data.chat.receiver);
            console.log('chatID ind', ind);
            if (ind != -1) return

            dispatch(onJoinChat([...chats, {
                sender: data.chat.sender,
                receiver: data.chat.receiver,
                name: data.chat.name,
                id_: data.chat._id,
                chat: data.chat.chat
            }]));

            // const ind = findChat(sender, receiver);
            // console.log('chatID ind', ind);

            // if (ind != -1) {
            // dispatch(onUpdateID({ _id, ind }));
            // dispatch(onChatActive(_id));
            // }


            setLocalChats([...chats, {
                sender: data.chat.sender,
                receiver: data.chat.receiver,
                name: data.chat.name,
                id_: data.chat._id,
                chat: data.chat.chat
            }]);
        });


        /**
         * Gestiona la recepción de mensajes de otro usuario
         */
        socket.on('msgFrom', async (data) => {

            console.log('receive', data, 'user', user, 'chats', chats)

            const ind = findChat(data.sender, data.receiver);
            console.log('ind', ind, chats[ind])

            if (ind != -1)
                dispatch(onSendMsg({ newMsg: data, ind }));

            else
                await loadChats(user._id);


            dispatch(onNewChats(true));

        });


        /**
         * Mensaje de error producido cuando se envía información errónea para crear un nuevo chat
         */
        socket.on("NoChatData", (data) => {
            console.log('El servidor ha devuelto la solicitud de createChat, data:', data)
        });


    };



    /**
     * Devuelve el índice del chat donde esta almacenando la información que llega
     * @method findChat
     * @param {String} sender ID del usuario que envía la información
     * @param {String} receiver ID del usuario que recibe la información
     */
    const findChat = (sender, receiver) => {

        console.log('chats', chats, sender, receiver);
        const exists = chats.findIndex(cr =>
            (cr.sender == sender && cr.receiver == receiver) || (cr.receiver == sender && cr.sender == receiver));

        return exists;
    };



    /**
     * Comprueba si ya existe el chat creado para este usuario y sino lo crea
     * @async
     * @param {String} sender ID del usuario que envía la información
     * @param {String} receiver ID del usuario que recibe la información
     * @returns {Number} índice del chat
     */
    const openChat = (sender, receiver) => {

        const ind = findChat(sender, receiver);
        console.log('ind', ind, chats[ind])

        if (ind != -1) {

            dispatch(onChatActive(chats[ind]._id));
            return ind
        }



        const newChatRoom = {
            sender,
            receiver,
            name: `${sender}-${receiver}`
        };


        // dispatch(onJoinChat([...chats, {
        //     sender,
        //     receiver,
        //     name: `${sender}-${receiver}`,
        //     chat: []
        // }]));

        console.log('newChatRoom', newChatRoom)
        socket.emit('newChat', newChatRoom);


        // setLocalChats(chats);

        // return chats.length;
    }


    /**
     * Envia un mensaje al servidor, para que éste lo reenvíe al usuario final, y lo almacena 
     * en el state Chats
     * @param {String} msg El mensaje a enviar
     * @param {String} ind El ID del chat
     * @param {String} receiver El ID del usuario que va a recibir el mensaje
     */
    const sendMsg = async (msg, ind, receiver, _id) => {
        console.log('msg', msg)

        const newMsg = {
            date: new Date(Date.now()).toLocaleString(),
            sender: _id,
            receiver,
            msg,
            msgSender: _id
        };

        socket.emit('msgTo', { ...newMsg, _id: chats[ind]._id, name: chats[ind].name });

        console.log('chats', chats);
        const newChat = [...chats];

        console.log('newChat', newChat);
        // newChat[ind].chat.push(newMsg);
        dispatch(onSendMsg({ newMsg, ind }));

        setLocalChats(chats);

    }


    const onConnect = () => dispatch(onConnecting());

    return {
        operations,
        sendMsg,
        findChat,
        openChat,
        onConnect
    }
}
