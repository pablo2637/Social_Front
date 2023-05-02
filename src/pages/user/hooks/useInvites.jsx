import { useState } from 'react'
import { useUserStore } from '../../../hooks/useUserStore';
import { useSelector } from 'react-redux';
import { fetchRemoveInvite, fetchRespondInvite, fetchSendInvite } from '../helpers/fetchDataUser';
import { useAuthStore } from '../../../hooks/useAuthStore';

export const useInvites = () => {


    const { user } = useSelector((state) => state.auth);
    const { loadInvites } = useUserStore();
    const { loadUser } = useAuthStore();
    const [msg, setMsg] = useState(null);


    const handleSend = async (_id) => {

        const invite = {
            sender: user._id,
            receiver: _id
        }

        const response = await fetchSendInvite(invite);

        if (!response.ok) {
            setMsg('Esta persona ya tiene una solicitud tuya, espera a que responda...');
            return
        }

        setMsg('Se ha enviado tu solicitud');
        await loadInvites();


        setTimeout(() => {
            setMsg(null);
        }, 3000)
    };


    const handleRemove = async (_id) => {

        const response = await fetchRemoveInvite({ _id });
        console.log('reponse remove', response)

        if (!response.ok) {
            setMsg('Esta persona no tiene una solicitud tuya...');
            return
        }

        setMsg('Se ha retirado tu solicitud');

        setTimeout(() => {
            setMsg(null);
        }, 3000)

        await loadInvites();
        await loadUser(user.email);
    };


    const handleRespond = async (sender, receiver, _id, accept) => {

        const invite = { sender, receiver, _id, accept };

        const response = await fetchRespondInvite(invite);

        if (!response.ok) {
            setMsg('Ha habido un fallo al reponder la invitación...');
            return
        }

        setMsg('Se ha respondido la invitación...');

        setTimeout(() => {
            setMsg(null);
        }, 3000)

        await loadInvites();
    };


    return {
        msg,
        handleRemove,
        handleRespond,
        handleSend
    }
}
