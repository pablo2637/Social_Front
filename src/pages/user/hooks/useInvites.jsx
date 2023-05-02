import { useState } from 'react'
import { useUserStore } from '../../../hooks/useUserStore';
import { useSelector } from 'react-redux';
import { fetchRemoveInvite, fetchRespondInvite, fetchSendInvite } from '../../../helpers/fetchData';

export const useInvites = () => {


    const { user } = useSelector((state) => state.auth);
    const { invites } = useSelector((state) => state.users);
    const { loadInvites } = useUserStore();
    const [sent, setSent] = useState(null)
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
        loadInvites();


        setTimeout(() => {
            setMsg(null);
        }, 3000)
    };


    const handleRemove = async (_id) => {

        const response = await fetchRemoveInvite({ _id });

        if (!response.ok) {
            setMsg('Esta persona no tiene una solicitud tuya...');
            return
        }

        setMsg('Se ha retirado tu solicitud');

        setTimeout(() => {
            setMsg(null);
        }, 3000)
        loadInvites();
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
        loadInvites();
    };


    const handleCheckInvites = (profile) => {

        const inviteSent = invites.find(inv => inv.sender == user._id && inv.receiver == profile._id);

        if (inviteSent)
            setSent(inviteSent._id);

        else
            setSent(null)
    };


    return {
        sent,
        msg,
        handleRemove,
        handleRespond,
        handleSend,
        handleCheckInvites
    }
}
