import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserName } from "../../../helpers/getUserData";
import { useInvites } from "../hooks/useInvites";

export const Invites = () => {

    const { invites, profiles } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);
    const [myInvites, setMyInvites] = useState([]);
    const {
        handleRemove,
        handleRespond,
        msg
    } = useInvites();


    const filterInvites = () => {

        const filter = [];
        invites.forEach(inv => {


            if (inv.sender == user._id) {
                const { name, email } = getUserName(inv.receiver, profiles);
                filter.push({ ...inv, name, email })

            } else if (inv.receiver == user._id) {
                const { name, email } = getUserName(inv.sender, profiles);
                filter.push({ ...inv, name, email })
            }

        });

        setMyInvites(filter);

    };


    useEffect(() => {
        filterInvites();

    }, [invites]);

    return (
        <div key={Date.now()}>

            <h3>Invitaciones enviadas:</h3>

            <p>{msg}</p>
            {

                myInvites.map(inv =>
                    inv.sender == user._id &&

                    < article >
                        <p>Fecha: {new Date(inv.date).toLocaleString()}</p>
                        <p>Para: {inv.name}</p>
                        <button onClick={() => handleRemove(inv._id)}>Retirar</button>
                    </article>
                )
            }

            <h3>Invitaciones recibidas:</h3>

            <p>{msg}</p>
            {

                myInvites.map(inv =>
                    inv.receiver == user._id &&

                    < article >
                        <p>Fecha: {new Date(inv.date).toLocaleString()}</p>
                        <p>De: {inv.name}</p>
                        <button onClick={() => handleRespond(user._id, inv.receiver, inv._id, true)} >Aceptar</button>
                        <button onClick={() => handleRespond(user._id, inv.receiver, inv._id, false)} >Rechazar</button>
                    </article>
                )
            }


        </div >
    )
}
