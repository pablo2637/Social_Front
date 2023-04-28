import { userAPI } from "../api/userAPI";

export const fetchDataEmail = async (email) => {

    const data = {
        type: 'email',
        email
    };

    const { data: user, ok, msg } = await userAPI(data);

    if (ok) {

        user.alt = `Imagen de ${user.name}`;
        user.date = new Date(user.date).toLocaleDateString();

        return {
            ok: true,
            user
        };

    } else {

        return {
            ok: false,
            msg
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
