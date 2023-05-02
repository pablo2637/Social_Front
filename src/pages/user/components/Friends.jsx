import { useSelector } from "react-redux";
import { LittlePeople } from "./";
import { useEffect, useState } from "react";
import { getUserData } from "../helpers/getUserData";
import { useFriends } from "../hooks/useFriends";
import { useUserStore } from "../../../hooks/useUserStore";

export const Friends = () => {

  const { profiles } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const { loadProfiles } = useUserStore();
  const {
    handleRemoveFriend,
    msg
  } = useFriends();

  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    console.log('profiles', profiles)
    if (profiles.length == 0) {
      console.log('aqui')
      await loadProfiles();
    }
    const newFriends = [];
    user.friends.map(fr => {
      const userData = getUserData(fr, profiles);
      newFriends.push({
        _id: fr,
        ...userData
      })
    })

    setFriends(newFriends);

  }

  useEffect(() => {
    getFriends();

  }, []);

  return (

    <section>

      {
        friends.map(fr =>

          <article key={`fr-${fr._id}`} >
            <LittlePeople name={fr.name} image={fr.image} />

            <button onClick={() => handleRemoveFriend(fr._id)}>Romper vínculo</button>
            <button>Abrir conversación</button>

            <p>{msg}</p>

          </article>

        )
      }


    </section>

  );

};
