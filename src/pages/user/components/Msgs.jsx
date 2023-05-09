import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Message, Msg } from "./";

export const Msgs = ({ msgs, _id, name }) => {

    const [userMsgs, setUserMsgs] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const { profiles } = useSelector((state) => state.users);


    const filterMessages = () => {
        const newMsgs = msgs.filter(msg => msg.from == _id || msg.to == _id);

        setUserMsgs(newMsgs);
    };


    useEffect(() => {

        if (msgs)
            filterMessages();

    }, [msgs]);

    return (

        <div className="divMsgs">

            <Message _id={_id} name={name} />

            <p>Mensajes:</p>
            
            <section>

                <div>
                    {
                        (userMsgs) &&
                        userMsgs.map(msg =>
                            <Msg key={msg.date + Date.now()} {...msg} name={name} />
                        )
                    }
                </div>
            </section>


        </div>
    )
}
