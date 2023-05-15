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
 * @method HomePageAdmin
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

    <section className="secAdmin">

      <h1>Dashboard:</h1>

      <div>
        <img src="../../assets/admin.png" alt="Imagen de portada" />
      </div>

    </section>

  );
};
