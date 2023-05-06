import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../helpers/getUserData";
import { useInvites } from "../hooks/useInvites";
import { NavLink } from "react-router-dom";
import { LittlePeople } from "./";

export const Invites = () => {

    const { invites, profiles } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);
    const [myInvitesSent, setMyInvitesSent] = useState([]);
    const [myInvitesReceived, setMyInvitesReceived] = useState([]);
    const {
        handleRemove,
        handleRespond,
        msg
    } = useInvites();


    const filterInvites = () => {

        // if (invites && user._id) {
        //     console.log('invite && user', invites, user)
        const filterS = [];
        const filterR = [];
        invites.forEach(inv => {

            if (inv.sender == user._id) {
                const data = getUserData(inv.receiver, profiles);
                if (!data) return
                const { name, image } = data
                filterS.push({ ...inv, name, image })


            } else if (inv.receiver == user._id) {
                const data = getUserData(inv.sender, profiles);
                if (!data) return
                const { name, image } = data
                filterR.push({ ...inv, name, image })
            }

        });

        setMyInvitesSent(filterS);
        setMyInvitesReceived(filterR);
        // }

    };


    useEffect(() => {
        filterInvites();

    }, [invites]);

    return (

        <section >


            <p>{msg}</p>

            <h3>Enviadas:</h3>

            {
                (myInvitesSent.length > 0) ?

                    myInvitesSent.map(inv =>

                        < article key={`iS-${inv._id + Date.now()}`} >
                            <LittlePeople date={inv.date} receiver={inv.name} image={inv.image} />

                            <button onClick={() => handleRemove(inv._id)}>Retirar</button>
                        </article>
                    )

                    :
                    <div>
                        <p>No has enviado solicitudes aún...</p>

                        <NavLink to='/meet'>Conocer Gente</NavLink>
                    </div>
            }

            <h3>Recibidas:</h3>

            {
                (myInvitesReceived.length > 0) ?

                    myInvitesReceived.map(inv =>

                        < article key={`iR-${inv._id + Date.now()}`} >
                            <LittlePeople date={inv.date} sender={inv.name} image={inv.image} />

                            <button onClick={() => handleRespond(inv.sender, user._id, inv._id, true)} >Aceptar</button>
                            <button onClick={() => handleRespond(inv.sender, user._id, inv._id, false)} >Rechazar</button>
                        </article>
                    )

                    :
                    <div>
                        <p>No tienes invitaciones pendientes...</p>
                    </div>
            }


        </section >
    )
}
