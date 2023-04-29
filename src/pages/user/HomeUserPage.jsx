
import { useSelector } from "react-redux";
import { Profile } from "./components";
import { EditProfile } from "./components/EditProfile";

export const HomeUserPage = () => {

  const { status, user, isChecking } = useSelector((state) => state.auth);

  return (

    <section>
      <h1>Hola, {user.name}</h1>
      {
        (user.profile.length > 0) ?
          <Profile profile={user.profile} />
          :
          <EditProfile />
      }

    </section>

  )
}
