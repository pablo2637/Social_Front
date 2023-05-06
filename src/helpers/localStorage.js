
/**
 * @author Pablo
 * @module localStorage
 */

/**
 * Devuelve los datos del usuario almacenados en el local storage
 * @method getLocal
 * @returns {json} user y status
 */
export const getLocal = () => {

    const user = JSON.parse(localStorage.getItem('scUser')) || {};

    let status;
    if (user.isAdmin)
        status = 'admin';

    else if (user._id)
        status = 'authenticated';

    else
        status = 'checking';

    return { user, status }
};



/**
 * Almacena los datos del usuario en el local storage
 * @method setLocal
 * @param {Object} data El objeto de usuario para almacenar
 */
export const setLocal = (data) => {

    localStorage.setItem('scUser', JSON.stringify(data));
};



/**
 * Eliminar del local storage los datos del usuarios, las invitaciones y los chats
 * @method deleteLocal
 */
export const deleteLocal = () => {

    localStorage.removeItem('scUser');
    localStorage.removeItem('scInvites');
    localStorage.removeItem('scChats');
};



/**
 * Devuelve los perfiles públicos almacenados en el local storage
 * @method getLocalProfiles
 * @returns {json} 
 */
export const getLocalProfiles = () => {

    const profiles = JSON.parse(localStorage.getItem('scProfiles')) || [];
    return profiles
};



/**
 * Almacena los perfiles públicos del usuario en el local storage
 * @method setLocalProfiles
 * @param {Object} data Los perfiles para almacenar
 */
export const setLocalProfiles = (data) => {

    localStorage.setItem('scProfiles', JSON.stringify(data));
};



/**
 * Devuelve las invitaciones almacenados en el local storage
 * @method getLocalInvites
 * @returns {json} 
 */
export const getLocalInvites = () => {

    const invites = JSON.parse(localStorage.getItem('scInvites')) || [];
    return invites
};



/**
 * Almacena las invitaciones de usuarios en el local storage
 * @method setLocalInvites
 * @param {Object} data Las invitaciones para almacenar
 */
export const setLocalInvites = (data) => {

    localStorage.setItem('scInvites', JSON.stringify(data));
};



/**
 * Devuelve los chats almacenados en el local storage
 * @method getLocalChats
 * @returns {json} 
 */
export const getLocalChats = () => {

    const chats = JSON.parse(localStorage.getItem('scChats')) || [];
    return chats
};



/**
 * Almacena los chats del usuario en el local storage
 * @method setLocalChats
 * @param {Object} data Los chats para almacenar
 */
export const setLocalChats = (data) => {

    localStorage.setItem('scChats', JSON.stringify(data));
};



/**
 * Devuelve los amigos almacenados en el local storage
 * @method getLocalFriends
 * @returns {json} 
 */
export const getLocalFriends = () => {

    const user = JSON.parse(localStorage.getItem('scUser')) || {};

    return user?.friends;
};



/**
 * Almacena los amigos del usuario en el local storage
 * @method setLocalFriends
 * @param {Object} data Los amigos para almacenar
 */
export const setLocalFriends = (data) => {

    const user = getLocal();
    user.friends = data;
    localStorage.setItem('scUser', JSON.stringify(user));
};


/**
 * Devuelve los mensajes almacenados en el local storage
 * @method getLocalMsgs
 * @returns {json} 
 */
export const getLocalMsgs = () => {

    const user = JSON.parse(localStorage.getItem('scUser')) || {};

    return user?.msgs;
};



/**
 * Almacena los mensajes del usuario en el local storage
 * @method setLocalMsgs
 * @param {Object} data Los mensajes para almacenar
 */
export const setLocalMsgs = (data) => {

    const user = getLocal();
    user.msgs = data;
    localStorage.setItem('scUser', JSON.stringify(user));
};