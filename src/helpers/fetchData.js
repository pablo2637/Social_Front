import { userAPI } from "../api/userAPI";

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


export const fetchLoadProfiles = async () => {

    const data = {
        type: 'getProfiles'
    }

    const response = await userAPI(data);

    if (response.ok) {

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



export const fetchDataRegister = async (formData) => {

    const data = {
        type: 'register'
    }

    const response = await userAPI(data, formData);

    if (response.ok) {

        let user = response.data;
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
