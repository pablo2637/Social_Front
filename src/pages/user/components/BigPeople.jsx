import { useEffect, useState } from "react";
import { Profile, PrivateProfile, Msgs, ChatBox } from "./";
import { useFriends } from "../hooks/useFriends";


export const BigPeople = ({ _id, profile, email, privateProfile, dateMod, privateDateMod, name, image, msgs }) => {

    const [show, setShow] = useState({ msgs: false, chat: false, warning: false })

    const {
        handleRemoveFriend,
        msg
    } = useFriends();



    const handleOnMsgs = () => {

        setShow({
            msgs: !show.msgs,
            chat: false,
            warning: false
        });

    };


    const handleOnChat = () => {

        setShow({
            msgs: false,
            chat: !show.chat,
            warning: false
        });

    };


    const handleOnWarning = () => {

        setShow({
            msgs: false,
            chat: false,
            warning: !show.warning
        });

    };


    return (

        <section className="secBigPeople">

            <div className="divPersonal">
                <div>
                    <h3>{name}</h3>
                    <p>{email}</p>
                </div>

                <div>
                    <img src={image} alt={`Foto de ${name}`} />
                </div>
            </div>

            <div className="divProfile">
                <Profile profile={profile} dateMod={dateMod} />
            </div>

            <div className="divPrivateProfile">
                {
                    (privateProfile.length > 0) &&
                    <PrivateProfile privateProfile={privateProfile} privateDateMod={privateDateMod} />
                }
            </div>

            <div className="divBtns">
                <button onClick={handleOnMsgs}><i className="fa-solid fa-envelope-circle-check"></i> Mensajes</button>
                <button onClick={handleOnChat}><i className="fa-regular fa-comments"></i> Chat</button>
                <button onClick={handleOnWarning}><i className="fa-solid fa-heart-crack"></i> Romper</button>

            </div>

            {
                (show.warning) &&
                <div className="divWarning">
                    <p>¿Estas seguro de romper este vínculo?</p>
                    <button onClick={() => handleRemoveFriend(_id)}><i className="fa-solid fa-heart-crack"></i> Sí, romperlo</button>
                    <button onClick={handleOnWarning} >No, Cancelar</button>
                </div>
            }

            {
                (show.msgs) &&
                <Msgs _id={_id} msgs={msgs} name={name} />
            }

            {
                (show.chat) &&
                <ChatBox _id={_id} name={name} />
            }

        </section>

    );
};