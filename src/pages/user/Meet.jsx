import { useSelector } from "react-redux";
import { People } from "./components";
import { useEffect, useState } from "react";

export const Meet = () => {

    const [myProfiles, setMyProfiles] = useState([]);

    const { profiles } = useSelector((state) => state.users)
    const { user } = useSelector((state) => state.auth)


    const filterProfiles = () => {
        const tempProfiles = profiles.filter(prof => !user.friends.includes(prof._id))
        
        setMyProfiles(tempProfiles);
    };
    

    useEffect(() => {
        filterProfiles();

    }, [profiles]);


    return (

        <section>

            <h2>Conocer Gente</h2>

            {
                myProfiles.map(prof => (
                    (prof._id != user._id) && < People key={prof._id} profile={prof} />
                ))
            }

        </section>
    )
}
