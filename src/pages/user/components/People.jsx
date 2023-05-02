import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useInvites } from "../hooks/useInvites";
import { LittlePeople } from "./";


export const People = ({ profile, isFriend }) => {


    const { user } = useSelector((state) => state.auth);
    const { invites } = useSelector((state) => state.users);
    const [sent, setSent] = useState(null);
    const [received, setReceived] = useState(null);

    const {
        handleRemove,
        handleSend,
        handleRespond,
        msg,
    } = useInvites();

    const checkInvites = (profile) => {

        const inviteSent = invites.find(inv => inv.sender == user._id && inv.receiver == profile._id);
        const inviteReceived = invites.find(inv => inv.sender == profile._id && inv.receiver == user._id);

        if (inviteSent)
            setSent(inviteSent._id);

        else
            setSent(null)

        if (inviteReceived)
            setReceived(inviteReceived._id);

        else
            setReceived(null)
    };

    useEffect(() => {
        checkInvites(profile);

    }, [invites]);


    return (

        <article>
            <LittlePeople name={profile.name} image={profile.image} />

            {
                (!isFriend) ?

                    (!received) ?

                        (!sent) ?
                            <button onClick={() => handleSend(profile._id)}>Conocer</button>
                            :
                            <button onClick={() => handleRemove(sent)}>Retirar solicitud</button>
                        :
                        <div>
                            <button onClick={() => handleRespond(profile._id, user._id, received, true)} >Aceptar</button>
                            <button onClick={() => handleRespond(profile._id, user._id, received, false)} >Rechazar</button>
                        </div>
                    :

                    <button>Abrir conversación</button>
            }

            <p>{msg}</p>
        </article>

    );
};


