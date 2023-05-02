import { userAPI } from "../../../api/userAPI";


export const fetchUpdateUser = async (formData) => {

    const data = {
        type: 'updateUser'
    }

    const response = await userAPI(data, formData);

    if (response.ok) {

        return {
            ok: true,
            user: response.user
        };

    } else {

        return {
            ok: false,
            msg: response.msg
        }

    }
};



export const fetchSendInvite = async (invite) => {

    const data = {
        type: 'sendInvite',
        body: invite
    }

    const response = await userAPI(data);

    if (response.ok) {

        return {
            ok: true,
            invite: response.invite
        };

    } else {

        return {
            ok: false,
            msg: response
        }

    }
};


export const fetchRespondInvite = async (invite) => {

    const data = {
        type: 'respondInvite',
        body: invite
    }

    const response = await userAPI(data);

    if (response.ok) {

        return {
            ok: true,
            invite: response.invite
        };

    } else {

        return {
            ok: false,
            msg: response
        }

    }
};


export const fetchRemoveInvite = async (_id) => {

    const data = {
        type: 'removeInvite',
        body: _id
    }

    const response = await userAPI(data);

    if (response.ok) {

        return {
            ok: true,
            msg: response.msg
        };

    } else {

        return {
            ok: false,
            msg: response
        }

    }
};


export const fetchRemoveFriend = async (_id, friendID) => {

    const data = {
        type: 'removeFriend',
        body: { _id, friendID }
    }

    const response = await userAPI(data);

    if (response.ok) {

        return {
            ok: true,
            msg: response.msg
        };

    } else {

        return {
            ok: false,
            msg: response
        }

    }
};



export const fetchUpdateProfile = async (formData) => {

    const data = {
        type: 'updateProfile'
    }

    const response = await userAPI(data, formData);

    if (response.ok) {

        return {
            ok: true,
            user: response.user
        };

    } else {

        return {
            ok: false,
            msg: response.msg
        }

    }
};



export const fetchDataEmail = async (email) => {

    const data = {
        type: 'email',
        email
    };

    const { user, ok, msg } = await userAPI(data);

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
            msg: msg
        }

    }
};

