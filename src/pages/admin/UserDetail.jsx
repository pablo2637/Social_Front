import { NavLink, useParams } from "react-router-dom"
import { User } from "./components";
import { PrivateProfile, Profile } from "../user/components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


export const UserDetail = () => {

    const { _id } = useParams();
    const { profiles } = useSelector((state) => state.users);
    const [profile, setProfile] = useState(null);


    const getProfiles = () => {

        const userProfile = profiles.find(prof => prof._id == _id);
        setProfile(userProfile);
    };


    useEffect(() => {
        getProfiles();

    }, [_id]);


    return (
        <section className="secUserDetailAdmin">

            <NavLink className='arrow' to={-1}><i className="fa-regular fa-circle-down fa-rotate-90"></i> Volver</NavLink>

            <User _id={_id} />

            <h3>Perfiles:</h3>

            {
                (profile) &&
                <>
                    <h4>Público:</h4>
                    <Profile key={`up${_id}${Date.now()}`} {...profile} />

                    <h4>Privado:</h4>
                    <PrivateProfile key={`pup${_id}${Date.now()}`} {...profile} />
                </>
            }


        </section>
    )
}
