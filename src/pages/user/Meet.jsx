import { useSelector } from "react-redux";
import { People } from "./components";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

export const Meet = () => {

    const [myProfiles, setMyProfiles] = useState([]);

    const { profiles, invites } = useSelector((state) => state.users)
    const { user } = useSelector((state) => state.auth)


    const filterProfiles = () => {
        const tempProfiles = profiles.filter(prof => !user.friends.includes(prof._id))

        setMyProfiles(tempProfiles);
    };


    useEffect(() => {
        filterProfiles();

    }, [profiles]);

    useEffect(() => {
        filterProfiles();

    }, [invites]);

    useEffect(() => {
        filterProfiles();

    }, [user.friends]);


    return (

        <section className="secMeet">

            <div className='divRoot'>
                <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Conocer gente:</span>
            </div>


            <h2>Conocer Gente:</h2>

            <div>
                <img src="../../assets/meet.png" alt="Imagen de portada de perfiles" />
            </div>


            <h3>Aquí los tienes:</h3>
            {
                myProfiles.map(prof => (
                    (prof._id != user._id) && < People key={prof._id} profile={prof} />
                ))
            }

        </section>
    )
}
