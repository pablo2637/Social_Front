import { useDispatch, useSelector } from 'react-redux';
import { onReconnectLimit, onSendMsg, onConnected, onConnecting, onConnectError, onDisconnect, onReconnect, onReconnectAttempt, onReconnectFailed, onSending, onLoadChats, onJoinChat, onUpdateID } from '../store/slice/socketSlice';
import { useUserStore } from './useUserStore';
import { useAuthStore } from './useAuthStore';
import { SocketContext } from '../contexts/SocketContext';
import { useContext } from 'react';
import { setLocalChats } from '../helpers/localStorage';


export const useSocketStore = () => {

    const { user } = useSelector((state) => state.auth);
    const { chats } = useSelector((state) => state.socket);

    const { socket } = useContext(SocketContext);

    const { loadInvites, loadMsgs, loadFriends, loadProfiles, loadChats } = useUserStore();
    const { loadUser, logoutUser } = useAuthStore();
    const dispatch = useDispatch();



    const operations = () => {

        socket.on('execute', (data) => {

            data.command.forEach(cmd => {
                console.log('command:', cmd)

                switch (cmd) {
                    case 'profiles':
                        loadProfiles();
                        break;

                    case 'invites':
                        loadInvites();
                        break;

                    case 'user':
                        if (!user.isAdmin) loadUser(user.email);
                        break;

                    case 'chats':
                        loadChats(user._id);
                        break;

                    case 'msgs':
                        loadMsgs(user._id)
                        break;

                    case 'friends':
                        loadFriends(user._id)
                        break;

                    case 'all':
                        loadInvites();
                        loadProfiles();
                        loadChats(user, _id);
                        if (!user.isAdmin) loadUser(user.email);
                        break;

                    case 'logout':
                        logoutUser();
                        break;
                }

            });

            console.log('execute command:', data.command)
        });


        socket.on("connect", () => {
            dispatch(onConnected());
        });

        socket.on("disconnect", () => {
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

            dispatch(onReconnectFailed());

            dispatch(onReconnectAttempt());

            dispatch(onConnectError());
        });



        socket.on('whoAreYou', async () => {
            console.log('whoAreYou', user._id)

            if (user)
                await socket.emit('whoAmI', { userID: user._id })
        });




        socket.on('chatID', ({ _id, sender, receiver }) => {
            console.log('chatID', _id, sender, receiver)

            const ind = findChat(sender, receiver);

            if (ind != -1)
                dispatch(onUpdateID({ _id, ind }));
        });



        socket.on('msgFrom', async (data) => {

            console.log('receive', data, 'user', user, 'chats', chats)

            const ind = findChat(data.sender, data.receiver);
            console.log('ind', ind, chats[ind])

            if (ind != -1)
                dispatch(onSendMsg({ newMsg: data, ind }));

            else
                await loadChats(user._id);

        });



        socket.on("NoChatData", (data) => {
            console.log('El servidor ha devuelto la solicitud de createChat, data:', data)
        });

    };




    const findChat = (sender, receiver) => {

        console.log('chats', chats, sender, receiver);
        const exists = chats.findIndex(cr =>
            (cr.sender == sender && cr.receiver == receiver) || (cr.receiver == sender && cr.sender == receiver));

        return exists;
    };




    const openChat = async (sender, receiver) => {

        const ind = findChat(sender, receiver);
        console.log('ind', ind, chats[ind])

        if (ind != -1)
            return ind

        const newChatRoom = {
            sender,
            receiver,
            name: `${sender}-${receiver}`
        };


        dispatch(onJoinChat([...chats, {
            sender,
            receiver,
            name: `${sender}-${receiver}`,
            chat: []
        }]));

        console.log('newChatRoom', newChatRoom)
        await socket.emit('newChat', newChatRoom);


        setLocalChats(chats);

        return chats.length;
    }


    /**
     * Envia un mensaje al servidor, para que éste lo reenvíe al usuario final, y lo almacena 
     * en el state Chats
     * @param {String} msg El mensaje a enviar
     * @param {String} ind El ID del chat
     * @param {String} receiver El ID del usuario que va a recibir el mensaje
     */
    const sendMsg = async (msg, ind, receiver) => {
        console.log('msg', msg)

        const newMsg = {
            date: new Date(Date.now()).toLocaleString(),
            sender: user._id,
            receiver,
            msg,
            msgSender: user._id
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
        openChat,
        onConnect
    }
}
