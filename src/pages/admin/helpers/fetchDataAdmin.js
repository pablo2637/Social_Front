import { userAPI } from "../../../api/userAPI";


/**
 * @author Pablo
 * @module fetchDataAdmin
 */


/**
 * Hace la consulta a la API para cargar todos los usuarios
 * @method fetchGetUsers
 * @async
 * @returns {json} OK y users
 * @throws {json} Error
 */
export const fetchGetUsers = async () => {

    const data = {
        type: 'getUsers'
    }

    const response = await userAPI(data);

    if (response.ok) {

        return {
            ok: true,
            users: response.data
        };

    } else {

        return {
            ok: false,
            msg: response.msg
        }

    }
};



/**
 * Hace la consulta a la API para eliminar un usuario
 * @method fetchDeleteUser
 * @async
 * @param {String} _id ID del usuario a eliminar
 * @param {String} uid ID de Firebase del usuario a eliminar
 * @returns {json} OK y users
 * @throws {json} Error
 */
export const fetchDeleteUser = async (_id, uid) => {

    const data = {
        type: 'deleteUser',
        body: { _id, uid }
    }

    const response = await userAPI(data);

    if (response.ok) {

        return {
            ok: true,
            users: response.data
        };

    } else {

        return {
            ok: false,
            msg: response.msg
        }

    }
};
