import { useSelector } from "react-redux";
import { User } from "./components";

/**
 * @author Pablo
 * @module Users
 */

/**
 * Pagina de usuarios 
 * @method Users
 * @returns Una vista mas detallada de los usuarios
 */
export const Users = () => {

    const { users } = useSelector((state) => state.users);


    return (

        <section className="secUsers">

            <h2>Usuarios:</h2>

            {(users) &&
                users.map(u =>
                    (!u.isAdmin) &&
                    <User key={`users${u._id}`} _id={u._id} />
                )
            }


        </section>
    )
}
