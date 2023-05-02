import { useSelector } from 'react-redux';
import { fetchRemoveFriend } from '../helpers/fetchDataUser';
import { useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';

export const useFriends = () => {

    const { loadUser } = useAuthStore();
    const [msg, setMsg] = useState(null);
    const { user } = useSelector((state) => state.auth);


    const handleRemoveFriend = async (friendID) => {

        console.log('friendID', friendID)
        const response = await fetchRemoveFriend(user._id, friendID);
        console.log('reponse remove', response)

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
        msg
    };
};
