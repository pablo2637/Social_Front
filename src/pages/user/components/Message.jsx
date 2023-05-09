import { useDispatch, useSelector } from "react-redux";
import { fetchDataSendMsg } from "../helpers/fetchDataUser";
import { useState } from "react";
import {  onLoadMsgs } from "../../../store/slice/authSlice";


export const Message = ({ name, _id }) => {

    const { user } = useSelector((state) => state.auth);
    const [msgSent, setMsgSent] = useState(false);
    const dispatch = useDispatch();

    const handleOnSubmit = async (ev) => {
        ev.preventDefault();

        const response = await fetchDataSendMsg(ev.target[0].value, user._id, _id)

        if (!response.ok)
            console.log('Error: ', response.msg)

        dispatch(onLoadMsgs(response.msgs));

        ev.target.reset();
        setMsgSent(true);

        setTimeout(() => {
            setMsgSent(false);

        }, 3000);
    }

    return (

        <section className="secMessage">

            <h4>Enviar Mensaje</h4>
            <p>Para: <span>{name}</span></p>

            <form onSubmit={handleOnSubmit}>

                <label htmlFor=""></label>
                <textarea
                    autoFocus
                    autoComplete="off"
                    name="msg"
                    placeholder="Escribe tu mensaje"
                ></textarea>

                <input type="submit" value="Enviar" />
            </form>


            {
                (msgSent) &&
                <p className="pMsgSent">Mensaje enviado...</p>
            }

        </section>

    )
}
