import { useSelector } from 'react-redux';
import { fetchRemoveFriend } from '../helpers/fetchDataUser';
import { useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { getUserData } from '../helpers/getUserData';

export const useFriends = () => {

    const { loadUser } = useAuthStore();
    const { profiles } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);
    const [msg, setMsg] = useState(null);
    const [lastChat, setLastChat] = useState(null);

    const [friends, setFriends] = useState([]);


    const handleGetFriends = async () => {

        const newFriends = [];
        user.friends.map(fr => {
            const userData = getUserData(fr, profiles);
            newFriends.push({
                _id: fr,
                show: false,
                ...userData
            })
        })

        setFriends(newFriends);

    }


    const handleOnOpenChat = async (friendID, show) => {

        const newFriends = [...friends];

        newFriends.map(fr => {
            if (fr._id == friendID) {
                fr.show = show //: fr.show = fr.show)
                setLastChat(fr._id);
            }

        })

        setFriends(newFriends);
    };



    const handleChangeChat = async () => {

        const newFriends = [...friends];

        newFriends.map(fr => fr._id == lastChat ? fr.show = false : fr.show = fr.show)

        setFriends(newFriends);
    };



    const handleRemoveFriend = async (friendID) => {

        const response = await fetchRemoveFriend(user._id, friendID);

        if (!response.ok) {
            setMsg('Algo ha ido mal al eliminar esta persona...');
            return
        }

        setMsg('Se ha eliminado relación...');

        setTimeout(() => {
            setMsg(null);
        }, 3000)

        await loadUser(user.email);
    };


    return {
        handleRemoveFriend,
        handleChangeChat,
        handleGetFriends,
        handleOnOpenChat,
        lastChat,
        friends,
        msg
    };
};
