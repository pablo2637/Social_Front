import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useInvites } from "../hooks/useInvites";


export const People = ({ profile }) => {

    const { invites } = useSelector((state) => state.users);

    const {
        handleCheckInvites,
        handleRemove,
        handleSend,
        msg,
        sent
    } = useInvites();


    useEffect(() => {
        handleCheckInvites(profile);

    }, [invites]);


    return (

        <article>
            <h3>{profile.name} </h3>
            <div>
                <img src={profile.image} alt="" />
            </div>

            {(!sent) ?
                <button onClick={() => handleSend(profile._id)}>Conocer</button>
                :
                <button onClick={() => handleRemove(sent)}>Retirar solicitud</button>
            }

            <p>{msg}</p>
        </article>

    );
};

