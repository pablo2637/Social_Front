import { userAPI } from "../api/userAPI";


/**
 * @author Pablo
 * @module fetchData
 */


/**
 * Hace la consulta a la API para cargar en el state las invitaciones de los usuarios
 * @method fetchLoadInvites
 * @async
 * @returns {json} OK e invites
 * @throws {json} Error
 */
export const fetchLoadInvites = async () => {

    const data = {
        type: 'getInvites'
    }

    const response = await userAPI(data);

    if (response.ok) {

        return {
            ok: true,
            invites: response.data
        };

    } else {

        return {
            ok: false,
            msg: response.msg
        }

    }
};



/**
 * Hace la consulta a la API para cargar en el state los perfiles públicos de los usuarios
 * @method fetchLoadProfiles
 * @async
 * @returns {json} OK y profiles
 * @throws {json} Error
 */
export const fetchLoadProfiles = async () => {

    const data = {
        type: 'getProfiles'
    }

    const response = await userAPI(data);

    if (response.ok) {

        response.data.map(prof => prof.dateMod = new Date(prof.dateMod).toLocaleString());
        return {
            ok: true,
            profiles: response.data
        };

    } else {

        return {
            ok: false,
            msg: response.msg
        }

    }
};



/**
 * Hace la consulta a la API para crear un usuario nuevo
 * @method fetchDataRegister
 * @async
 * @param {Object} formData Los elementos del formulario para crear el usuario sin serializar
 * @returns {json} OK y user
 * @throws {json} Error
 */
export const fetchDataRegister = async (formData) => {

    const data = {
        type: 'register'
    }

    const response = await userAPI(data, formData);

    if (response.ok) {

        let user = response.user;
        user.alt = `Imagen de ${user.name}`;
        user.date = new Date(user.date).toLocaleString();

        return {
            ok: true,
            user
        };

    } else {

        return {
            ok: false,
            msg: response
        }

    }
};



/**
 * Esta función es llamada luego de crear el usuario con una cuenta de Google en Firebase y
 * luego se la consulta a la API para crear el usuario nuevo en la base de datos propia
 * @method fetchDataRegisterGoogle
 * @async
 * @param {Object} userData Los datos para crear el usuario
 * @returns {json} OK y user
 * @throws {json} Error
 */
export const fetchDataRegisterGoogle = async (userData) => {

    const data = {
        type: 'registerGoogle',
        body: userData
    }

    const response = await userAPI(data);

    if (response.ok) {

        let user = response.user;
        user.alt = `Imagen de ${user.name}`;
        user.date = new Date(user.date).toLocaleDateString();

        return {
            ok: true,
            user
        };

    } else {

        return {
            ok: false,
            msg: response
        }

    }
};
