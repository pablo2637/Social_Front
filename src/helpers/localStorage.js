
export const getLocal = () => {

    const user = JSON.parse(localStorage.getItem('scUser')) || {};
    const status = user._id ? 'authenticated' : 'checking';

    return { user, status }
};


export const setLocal = (data) => {

    return localStorage.setItem('scUser', JSON.stringify(data));
};


export const deleteLocal = () => {

    localStorage.removeItem('scUser');
    localStorage.removeItem('scInvites');    
    localStorage.removeItem('scChats');   
};


export const getLocalProfiles = () => {

    const profiles = JSON.parse(localStorage.getItem('scProfiles')) || [];
    return profiles
};


export const setLocalProfiles = (data) => {

    return localStorage.setItem('scProfiles', JSON.stringify(data));
};


export const getLocalInvites = () => {

    const invites = JSON.parse(localStorage.getItem('scInvites')) || [];
    return invites
};


export const setLocalInvites = (data) => {

    return localStorage.setItem('scInvites', JSON.stringify(data));
};


export const getLocalChats = () => {

    const chats = JSON.parse(localStorage.getItem('scChats')) || [];
    return chats
};


export const setLocalChats = (data) => {

    return localStorage.setItem('scChats', JSON.stringify(data));
};