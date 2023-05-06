import { useSelector } from "react-redux";
import { ChatBox, LittlePeople } from "./";
import { useEffect, useState } from "react";
// import { getUserData } from "../helpers/getUserData";
import { useFriends } from "../hooks/useFriends";
import { useUserStore } from "../../../hooks/useUserStore";

export const Friends = () => {


  const { chats } = useSelector((state) => state.socket)
  // const { profiles } = useSelector((state) => state.users);
  // const { user } = useSelector((state) => state.auth);
  const { loadProfiles } = useUserStore();
  const {
    handleRemoveFriend,
    handleOnOpenChat,
    handleGetFriends,
    msg,
    friends
  } = useFriends();


  useEffect(() => {
    handleGetFriends();

  }, []);

  return (

    <section>

      {
        friends.map(fr =>
          <article key={`fr-${fr._id}`} >
            <LittlePeople name={fr.name} image={fr.image} />

            {
              (fr.name) &&
              <>
                <button onClick={() => handleRemoveFriend(fr._id)}>Romper vínculo</button>

                {(fr.show)
                  ?
                  <button onClick={() => handleOnOpenChat(fr._id, false)}>Ocultar conversación</button>
                  :
                  <button onClick={() => handleOnOpenChat(fr._id, true)}>Abrir conversación</button>
                }
              </>
            }


            <p>{msg}</p>

            {
              (fr.show) && <ChatBox {...fr} />
            }

          </article>

        )
      }

    </section>

  );

};
