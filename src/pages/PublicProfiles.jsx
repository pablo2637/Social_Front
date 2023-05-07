import { useSelector } from "react-redux";
import { Profile } from "./user/components";


export const PublicProfiles = () => {

    const { profiles, isLoading, userStatus } = useSelector((state) => state.users);

    return (

        <section className="secPublicProfiles">

            <h2>Perfiles Públicos:</h2>
            {
                profiles.map(profile =>

                    <Profile key={profile._id} {...profile} />
                )
            }
        </section>

    );
};
