
/**
 * @author Pablo
 * @module userApis
 * @exports Object
 */


/**
 * Función que devuelve la url y el objeto options para pasar a la funcíón del Fetch
 * @module getURLs
 * @param {Object} data Objeto que tiene type: string, con la orden a ejecutar, y body o params, que es la
 * información a enviar
 * @param {Object} [formData] Objecto form con la información de formulario sin serializar para enviar
 * @returns {Object} url y options
 */
const getURLs = (data, formData) => {

    const urlBack = import.meta.env.VITE_URL_BACK;
    //"http://localhost:3000"

    let url, options = {};
    switch (data.type) {

        case 'getUsers':
            url = `${urlBack}/api/users/`;
            break;


        case 'email':
            url = `${urlBack}/api/users/email/${data.email}`;
            break;


        case 'register':
            url = `${urlBack}/api/users`;
            options = {
                method: 'POST',
                body: formData
            }
            break;


        case 'updateUser':
            url = `${urlBack}/api/users`;
            options = {
                method: 'PUT',
                body: formData
            }
            break;


        case 'deleteUser':
            url = `${urlBack}/api/users/`;
            options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;




        case 'registerGoogle':
            url = `${urlBack}/api/users`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;



        case 'sendInvite':
            url = `${urlBack}/api/users/invite`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;


        case 'removeInvite':
            url = `${urlBack}/api/users/invite`;
            options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;


        case 'getInvites':
            url = `${urlBack}/api/users/invite`;
            break;


        case 'respondInvite':
            url = `${urlBack}/api/users/invite`;
            options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;





        case 'sendMsg':
            url = `${urlBack}/api/users/msg`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;




        case 'removeFriend':
            url = `${urlBack}/api/users/friends`;
            options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.body)
            }
            break;


        case 'getFriends':
            url = `${urlBack}/api/users/friends/${data._id}`;
            break;


        case 'getMsgs':
            url = `${urlBack}/api/users/msg/${data._id}`;
            break;


        case 'getChats':
            url = `${urlBack}/api/users/chats/${data._id}`;
            break;


            
        case 'updateProfile':
            url = `${urlBack}/api/users/profile`;
            options = {
                method: 'PUT',
                body: formData
            }
            break;


        case 'updatePrivateProfile':
            url = `${urlBack}/api/users/privateprofile`;
            options = {
                method: 'PUT',
                body: formData
            }
            break;


        case 'getProfiles':
            url = `${urlBack}/api/public`;
            break;

    };

    return { url, options };

}



/**
 * Función para obtener información del Back, a través de Fetch
 * @method userAPI
 * @param {Object} data Objeto que tiene type: string, con la orden a ejecutar, y body o params, que es la
 * información a enviar
 * @param {Object} [formData] Objecto form con la información de formulario sin serializar para enviar
 * @returns {json} Con la información devuelta por la consulta
 * @throws {json} Error
 */
export const userAPI = async (data, formData) => {


    const { url, options } = getURLs(data, formData);

    try {
        console.log('url', url, 'options', options)
        const request = await fetch(url, options);
        // console.log('request',request)

        if (request.ok) {
            const response = await request.json();
            // console.log('response',response)
            return response;

        } else {

            throw {
                data: request
            };
        }

    } catch (e) {
        console.log('errorFetch', e)

        return {
            msg: 'errorFetch',
            error: e,
            ok: false
        }

    };
}
