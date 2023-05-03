import { useSelector } from "react-redux";
import { Profile } from "./components";

export const Profiles = () => {

    const { profiles } = useSelector((state) => state.users);

    return (

        <section>

            <h2>Perfiles públicos:</h2>

            {profiles.map(profile =>

                <Profile key={profile._id} {...profile} />
            )}

        </section>

    );
};
