import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useInvites } from "../hooks/useInvites";
import { LittlePeople } from "./";


export const People = ({ profile, isFriend }) => {


    const { user } = useSelector((state) => state.auth);
    const { invites, isLoading } = useSelector((state) => state.users);
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
            <div>

                {

                    (!isLoading) ?

                        (!isFriend) ?

                            (!received) ?

                                (!sent) ?
                                    <button
                                        disabled={(isLoading) ? true : false}
                                        onClick={() => handleSend(profile._id)}
                                    ><i className="fa-regular fa-handshake"></i> Conocer</button>
                                    :
                                    <button
                                        disabled={(isLoading) ? true : false}
                                        onClick={() => handleRemove(sent)}
                                    ><i className="fa-solid fa-heart-crack"></i> Retirar solicitud</button>
                                :
                                <>
                                    <button
                                        disabled={(isLoading) ? true : false}
                                        onClick={() => handleRespond(profile._id, user._id, received, true)}
                                    ><i className="fa-solid fa-heart  fa-beat-fade"></i> Aceptar</button>

                                    <button
                                        disabled={(isLoading) ? true : false}
                                        onClick={() => handleRespond(profile._id, user._id, received, false)}
                                    ><i className="fa-solid fa-skull-crossbones"></i> Rechazar</button>
                                </>

                            :

                            <button>Abrir conversación</button>
                        :

                        (isLoading) &&
                        < span className="loader-light"></span>
                }
            </div>

            <p>{msg}</p>
        </article>

    );
};


