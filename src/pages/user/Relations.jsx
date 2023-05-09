import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { BigPeople } from "./components"
import { useEffect, useState } from "react"


export const Relations = () => {


    const { profiles, invites } = useSelector((state) => state.users)
    const { user } = useSelector((state) => state.auth)
    const { chats } = useSelector((state) => state.socket)

    const [myProfiles, setMyProfiles] = useState([]);


    const filterProfiles = () => {
        const tempProfiles = profiles.filter(prof => user.friends.includes(prof._id))

        setMyProfiles(tempProfiles);
    };


    useEffect(() => {
        filterProfiles();

    }, [profiles]);

    return (

        <section className="secRelations">

            <div className='divRoot'>
                <NavLink to='/'>&gt; Tu cuenta</NavLink><span> &gt; Mis relaciones:</span>
            </div>


            <h2>Mis Relaciones:</h2>

            <div>
                <img src="../../assets/relations.png" alt="Imagen de portada de perfiles" />
            </div>


            <div>

                {
                    myProfiles.map(prof => (
                        (prof._id != user._id) && < BigPeople key={prof._id} {...prof} msgs={user.msgs} />
                    ))
                }

            </div>


            <h2>Invitaciones:</h2>

        </section>

    )
}
