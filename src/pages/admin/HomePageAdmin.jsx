import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUserStore } from "../../hooks/useUserStore";
import { User } from "./components/";

/**
 * @author Pablo
 * @module HomePageAdmin
 */

/**
 * Pagina principal del administrador
 * @metod HomePageAdmin
 * @returns El dashboard del administrador
 */
export const HomePageAdmin = () => {

  const { users } = useSelector((state) => state.users);
  const { getUsers } = useUserStore();

  const loadUsers = async () => {

    const response = await getUsers();
    if (!response.ok)
      console.log('Error al cargar los usuarios', response.msg)

  }

  useEffect(() => {
    loadUsers();

  }, []);

  return (

    <section>
      <h1>Dashboard:</h1>

      <h2>Usuarios:</h2>
      {/* {(users) &&
        users.map(u =>
          <User key={`${u._id}${Date.now()}`} _id={u._id} />
        )
      } */}


    </section>

  );
};
