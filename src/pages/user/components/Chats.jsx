import { useSelector } from "react-redux"
import { LittlePeople } from "./LittlePeople";


export const Chats = () => {

    const { chats } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.auth);

    return (


        <section className="secChats">

            <div className="divPeople">
                {/* {
                    chats.chats.map(ch =>
                        <LittlePeople 
                )
                } */}
            </div>

            <div className="divChatContainer">


            </div>

        </section>
    )
}
