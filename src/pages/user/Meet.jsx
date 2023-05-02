import { useSelector } from "react-redux";
import { People } from "./components";

export const Meet = () => {

    const { profiles } = useSelector((state) => state.users)
    const { user } = useSelector((state) => state.auth)

    return (

        <section>

            <h2>Conocer Gente</h2>

            {
                profiles.map(prof => (
                    (prof._id != user._id) && < People key={prof._id} profile={prof} />
                ))
            }

        </section>
    )
}
