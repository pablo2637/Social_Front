import { useSelector } from "react-redux";
import { ChatBox, LittlePeople } from "./";
import { useEffect, useState } from "react";
import { useFriends } from "../hooks/useFriends";
import { useUserStore } from "../../../hooks/useUserStore";

export const Friends = () => {


  const { chats } = useSelector((state) => state.socket)

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


    <section className="secUserFriends">

      {
        friends.map(fr =>

          <article key={`fr-${Date.now() + fr.name}`} >
            <LittlePeople name={fr.name} image={fr.image} />

            {
              (fr.name) &&
              <div className="divBtnsChat">
                {/* <button onClick={() => handleRemoveFriend(fr._id)}><i class="fa-solid fa-heart-crack"></i> Romper vínculo</button> */}

                {(fr.show)
                  ?
                  <button onClick={() => handleOnOpenChat(fr._id, false)}><i className="fa-solid fa-rectangle-xmark"></i></button>
                  :
                  <button onClick={() => handleOnOpenChat(fr._id, true)}><i className="fa-solid fa-comment-dots"></i></button>
                }
              </div>
            }


            <p className="pChatMsg">{msg}</p>

            {
              (fr.show) && <ChatBox {...fr} />
            }

          </article>

        )
      }
    </ section>

  );

};
