import { useDispatch, useSelector } from "react-redux";
import { fetchDataSendMsg } from "../helpers/fetchDataUser";
import { useState } from "react";
import { onLoadMsgs } from "../../../store/slice/authSlice";


export const Message = ({ name, _id, isAdmin }) => {

    const { user } = useSelector((state) => state.auth);
    const [msgSent, setMsgSent] = useState('');
    const dispatch = useDispatch();


    const handleOnSubmit = async (ev) => {
        ev.preventDefault();

        if (ev.target[0].value == '') return

        setMsgSent('Enviando mensaje...');
        const response = await fetchDataSendMsg(ev.target[0].value, user._id, _id, isAdmin);

        if (!response.ok)
            console.log('Error: ', response.msg)

        console.log('msgs', response.msgs);
        dispatch(onLoadMsgs(response.msgs));

        ev.target.reset();
        setMsgSent('Mensaje enviado!');

        setTimeout(() => {
            setMsgSent('');

        }, 3000);
    }


    return (

        <section className="secMessage">

            <h4>Enviar Mensaje</h4>

            <p>Para: <span>{name}</span></p>

            <form onSubmit={handleOnSubmit}>

                <textarea
                    autoFocus
                    autoComplete="off"
                    name="msg"
                    placeholder="Escribe tu mensaje"
                ></textarea>

                <input type="submit" value="Enviar" />
            </form>

            <p className="pMsgSent">{msgSent}</p>         

        </section>

    )
}
