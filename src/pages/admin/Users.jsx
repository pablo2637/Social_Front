import { useSelector } from "react-redux";
import { User } from "./components";


export const Users = () => {

    const { users } = useSelector((state) => state.users);


    return (

        <section>

            <h2>Usuarios:</h2>

            {(users) &&
                users.map(u =>
                    (!u.isAdmin) &&
                    <User key={`${u._id}${Date.now()}`} _id={u._id} />
                )
            }


        </section>
    )
}
