import { useSelector } from "react-redux";
import { User } from "./components";

/**
 * @author Pablo
 * @module Users
 */

/**
 * Pagina de usuarios 
 * @metod Users
 * @returns Una vista mas detallada de los usuarios
 */
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
