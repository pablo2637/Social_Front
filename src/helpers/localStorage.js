
export const getLocal = () => {

    const user = JSON.parse(localStorage.getItem('userSocial')) || {};    
    const status = user.id ? 'authenticated' : 'checking';
    
    return { user, status }
};

export const setLocal = (data) => {
    return localStorage.setItem('userSocial', JSON.stringify(data));
};

export const deleteLocal = () => {
    localStorage.removeItem('userSocial');
};