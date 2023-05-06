import { useSelector } from "react-redux";
import { fetchDataSendMsg } from "../helpers/fetchDataUser";
import { useState } from "react";


export const Message = ({ name, _id }) => {

    const { user } = useSelector((state) => state.auth);
    const [msgSent, setMsgSent] = useState(false);

    const handleOnSubmit = async (ev) => {
        ev.preventDefault();

        console.log('ev.target', ev.target[0].value, _id, user._id)
        const response = await fetchDataSendMsg(ev.target[0].value, user._id, _id)
        if (!response.ok)
            console.log('Error: ', response.msg)

        ev.target.reset();
        setMsgSent(true);

        setTimeout(() => {
            setMsgSent(false);

        }, 3000);
    }

    return (
        <section>

            <h3>Enviar Mensaje</h3>
            <p>Para: {name}</p>
            <form onSubmit={handleOnSubmit}>

                <label htmlFor=""></label>
                <textarea autoFocus autoComplete="off" name="msg" placeholder="Escribe tu mensaje"></textarea>

                <input type="submit" value="Enviar" />
            </form>

            {
                (msgSent) &&
                <p>Mensaje enviado...</p>
            }


        </section>

    )
}
