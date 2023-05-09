import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../helpers/getUserData";
import { useInvites } from "../hooks/useInvites";
import { NavLink } from "react-router-dom";
import { LittlePeople } from "./";


export const Invites = () => {

    const { invites, profiles } = useSelector((state) => state.users);
    const { user, isLoading } = useSelector((state) => state.auth);
    const [myInvitesSent, setMyInvitesSent] = useState([]);
    const [myInvitesReceived, setMyInvitesReceived] = useState([]);

    const {
        handleRemove,
        handleRespond,
        msg
    } = useInvites();


    const filterInvites = () => {

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

    };


    useEffect(() => {
        filterInvites();

    }, [invites]);

    return (

        <section className="secInvites">

            <h2>Invitaciones:</h2>

            <p>{msg}</p>


            <div className="divInvSent">

                <h3>Enviadas:</h3>

                {
                    (myInvitesSent.length > 0) ?

                        myInvitesSent.map(inv =>

                            < article key={`iS-${inv._id + Date.now()}`} >
                                <LittlePeople date={inv.date} receiver={inv.name} image={inv.image} />


                                <div className="divBtns">
                                    <button
                                        disabled={(isLoading) ? true : false}
                                        onClick={() => handleRemove(inv._id)}
                                    ><i className="fa-solid fa-heart-crack"></i> Retirar solicitud</button>
                                </div>
                            </article>
                        )

                        :

                        <div className="divNoInv">
                            <p>No has enviado solicitudes aún...</p>

                            <NavLink to='/meet'><i className="fa-regular fa-handshake"></i> Conocer Gente</NavLink>
                        </div>
                }
            </div>


            <div className="divInvReceived">

                <h3>Recibidas:</h3>

                {
                    (myInvitesReceived.length > 0) ?

                        myInvitesReceived.map(inv =>

                            < article key={`iR-${inv._id + Date.now()}`} >
                                <LittlePeople date={inv.date} sender={inv.name} image={inv.image} />

                                <div className="divBtns">
                                    <button
                                        disabled={(isLoading) ? true : false}
                                        onClick={() => handleRespond(inv.sender, user._id, inv._id, true)}
                                    ><i className="fa-solid fa-heart  fa-beat-fade"></i> Aceptar</button>
                                    <button
                                        disabled={(isLoading) ? true : false}
                                        onClick={() => handleRespond(inv.sender, user._id, inv._id, false)}
                                    ><i className="fa-solid fa-skull-crossbones"></i> Rechazar</button>
                                </div>
                            </article>
                        )

                        :

                        <div className="divNoInv">
                            <p>No tienes invitaciones pendientes...</p>
                        </div>
                }

            </div>


        </section >
    )
}
